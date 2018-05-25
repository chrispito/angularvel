<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Bible\BibleVersion;
use App\Models\Bible\BibleVerse;
use App\Models\Bible\BibleBook;
use App\Utils\BibleBookShortUtils;
use App\Transformers\BibleSearchTransformer;
use App\Transformers\BibleVerseTransformer;
use App\Transformers\BibleChapterTransformer;
use App\Transformers\BibleBookTransformer;
use App\Transformers\BibleLanguageTransformer;
use App\Transformers\BibleVersionTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BibleSearchController extends Controller
{
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'version' => 'required|max:10',
        ]);
    }

    /**
     * Search in the Bible
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'version' => 'string',
            'book' => 'string',
            'chapter' => 'integer'
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => "FAIL", "data" => $validator->errors()], 501);
        }
        
        if (!$request->version) {
            return $this->getAllVersions();
        } else if (!$request->book)
        {
            return $this->getAllBooks($request->version);
        } else if (!$request->chapter)
        {
            return $this->getAllChapters($request->book);
        }

        $version = BibleVersion::where('short', 'like', $request->version)->first();
        
        if ($version && $version->count() != 0) {
            $book = array_filter($version->books->all(), function($value, $key) use ($request) {
                return $value->name == $request->book;
            }, ARRAY_FILTER_USE_BOTH);
            if (!empty($book)) {
                $verses = array_values($book)[0]->verses->filter(function ($selected_book, $key)  use ($request) {
                    return $selected_book->chapter_nr == $request->chapter;
                })->all();
                if (empty($verses)) {
                    return response()->json("No Chapter Found for the given chapter", 404);
                }
                if (!empty($request->verse)) {
                    $searched_verse = $request->verse;
                    if (strpos($searched_verse, '-') !== false) {
                        $searched_verse = explode('-', $searched_verse);
                        $verse = array_filter($verses, function($value, $key) use ($searched_verse) {
                            $start = intval($searched_verse[0]);
                            $end = intval($searched_verse[1]);
                            return $value->verse_nr >= $start && $value->verse_nr <= $end;
                        }, ARRAY_FILTER_USE_BOTH);
                    } else {
                        $verse = array_filter($verses, function($value, $key) use ($request) {
                            return $value->verse_nr == $request->verse;
                        }, ARRAY_FILTER_USE_BOTH);
                    }
                    if (empty($verse)) {
                        return response()->json("No verse Found for the given verse", 404);
                    }
                    return response()->json(array(
                        "status" => "OK", 
                        "result" => $verse, 
                        "searchDtata" => $request->all()
                    ) , 200);
                }
                return response()->json(array(
                    "status" => "OK", 
                    "result" => $verses, 
                    "searchDtata" => $request->all()
                ) , 200);
            } else {
                return response()->json("No Books Found for the given book", 404);
            }
        } else {
            return response()->json("No Version Found for the given version", 404);
        }
    }


    private function getAllVersions() {
        $versions = BibleVersion::all();

        return fractal($versions, new BibleVersionTransformer);
    }

    private function getAllBooks($version) {
        $version = BibleVersion::where('short', 'like', $version)->first();
        
        if ($version && $version->count() != 0) {
            return fractal($version->books->all(), new BibleBookTransformer);
        } else {
            return response()->json("No Version Found for the given version", 404);
        }
    }

    private function getAllChapters($bookName) {
        $book = BibleBook::where('name', 'like', $bookName)->first();
        
        if ($book && $book->count() != 0) {
            $result = DB::table('Bible_verses')
                            ->select('chapter_nr')
                            ->distinct()
                            ->where('Bible_book_id', '=', $book->id)
                            ->get();

            return response()->json($result, 200);
            // return fractal($version->books->all(), new BibleBookTransformer);
        } else {
            return response()->json("No Book Found for the given Book", 404);
        }
    }


    private function log($toLog)
    {
        echo( json_encode($toLog) );
        echo( "\n" );
    }

    /**
     * Find all languages from the store
     *
     * @return \Illuminate\Http\Response
     */
    public function findLanguages() {
        $language = BibleVersion::select('l_name', 'l_short')->distinct()->get();

        return fractal($language, new BibleLanguageTransformer);
    }

    /**
     * Find all versions from the store
     *
     * @return \Illuminate\Http\Response
     */
    public function findVersions(Request $request)
    {
        $results = BibleVersion::where('l_short', 'like', $request->language)->get();
        return fractal($results, new BibleVersionTransformer);
    }

    /**
     * Find all books by version from the store
     *
     * @return \Illuminate\Http\Response
     */
    public function findBooksByVersion(Request $request)
    {   
        $version = BibleVersion::where('v_short', 'like', $request->version)->first();
        
        if ($version && $version->count() != 0) {
            $book = BibleBook::where('bible_version_id', '=', $version->id)->get();
            if ($book && $book->count() != 0) {
                return fractal($book, new BibleBookTransformer);
            } else {
                return response()->json("No Books Found", 404);
            }
        } else {
            return response()->json("No Versions Found", 404);
        }
    }

    /**
     * Find all books by version from the store
     *
     * @return \Illuminate\Http\Response
     */
    public function findChapters(Request $request)
    {
        $version = BibleVersion::where('v_short', 'like', $request->version)->first();
        if ($version && $version->count() != 0) {
            $book = BibleBook::where('bible_version_id', '=', $version->id)
            ->where('b_number', '=', $request->book)
            ->first();
            if ($book && $book->count() != 0) {
                $verse = BibleVerse::select('b', 'c')
                ->distinct()
                ->where('bible_version_id', '=', $version->id)
                ->where('b', '=', $book->b_number)
                ->orderBy('c', 'asc')
                ->get();

                return fractal($verse, new BibleChapterTransformer);
            } else {
                return response()->json("No Books Found", 404);
            }
        } else {
            return response()->json("No Version Found for the given version", 404);
        }
    }

    /**
     * Find all books by version from the store
     *
     * @return \Illuminate\Http\Response
     */
    public function findVerses(Request $request)
    {
        $version = BibleVersion::where('v_short', 'like', $request->version)->first();
        if ($version && $version->count() != 0) {
            $book = BibleBook::where('bible_version_id', '=', $version->id)
            ->where('b_number', '=', $request->book)
            ->first();
            if ($book && $book->count() != 0) {
                $verse = BibleVerse::where('bible_version_id', '=', $version->id)
                ->where('b', '=', $book->b_number)
                ->where('c', '=', $request->chapter)
                ->orderBy('v', 'asc')
                ->get();

                return fractal($verse, new BibleVerseTransformer);
            } else {
                return response()->json("No Books Found", 404);
            }
        } else {
            return response()->json("No Version Found for the given version", 404);
        }
    }

}