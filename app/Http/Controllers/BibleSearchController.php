<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Bible\BblVersion;
use App\Models\Bible\BblBook;
use App\Utils\BibleBookShortUtils;
use App\Transformers\BibleSearchTransformer;
use App\Transformers\BblVerseTransformer;
use App\Transformers\BblBookTransformer;
use App\Transformers\BblVersionTransformer;
use Illuminate\Http\Request;

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
        $result = BblVersion::where('short', 'like', $request->version)->first();
        return response()->json($result->books, 200);
        // return fractal($versions->first(), new BibleSearchResponseTransformer);
    }
    private function log($toLog)
    {
        echo( json_encode($toLog) );
        echo( "\n" );
    }

    /**
     * Find all versions from the store
     *
     * @return \Illuminate\Http\Response
     */
    public function findVersions(Request $request)
    {
        $result = BblVersion::all();
        return fractal($result, new BblVersionTransformer);
    }

    /**
     * Find all books by version from the store
     *
     * @return \Illuminate\Http\Response
     */
    public function findBooksByVersion(Request $request)
    {   
        $version = BblVersion::where('short', 'like', $request->version)->first();
        
        if ($version && $version->count() != 0) {
            return fractal($version->books, new BblBookTransformer);
        } else {
            return response()->json("No Books Found", 404);
        }
    }

    function versesChapterMap($chapter) {
        $this->log($chapter);
        // $result->verses = fractal($chapter->, new BblVerseTransformer)
        return ;
    }

    /**
     * Find all books by version from the store
     *
     * @return \Illuminate\Http\Response
     */
    public function findChapterAndVerses(Request $request)
    {
        $version = BblVersion::where('short', 'like', $request->version)->first();
        
        if ($version && $version->count() != 0) {
            $book = array_filter($version->books->all(), function($value, $key) use ($request) {
                return $value->name == $request->book;
            }, ARRAY_FILTER_USE_BOTH);

            if (!empty($book)) {
                $verses = array_values($book)[0]->verses->groupBy('chapter_nr');
                return response()->json(array_values($book)[0]->verses->groupBy('chapter_nr'), 200);
                // return fractal($version->books, new BblBookTransformer);
            } else {
                return response()->json("No Books Found for the given book", 404);
            }
        } else {
            return response()->json("No Version Found for the given version", 404);
        }
    }

}