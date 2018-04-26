<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Bible\BblVersion;
use App\Models\Bible\BblBook;
use App\Utils\BibleBookShortUtils;
use App\Transformers\BibleSearchTransformer;
use App\Transformers\BblBookTransformer;
use Illuminate\Http\Request;

class BibleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $requestList)
    {
        // return json_decode($requestList->list);
        foreach ($requestList->list as $request )
        {
            $uri = 'http://getbible.net/json?version=' . $data['version_ref'];
            $res = \Httpful\Request::get($uri)->send();
            $bible = substr($res->body, 0, -2);
            $bible = substr($bible, 1); 
            $bible = json_decode($bible, true);

            $version_result = $this->checkVersion();
            switch ($version_result["Status"]) {
                case 'OK':
                    $this->createBible($bible, $version_result["Value"]);
                    break;
                case 'NOT':
                    return response()->json(['error' => 'The version you are trying to add allready exist']);
                    break;
                case 'ERROR':
                return response()->json(['error' => 'Error trying to retrieve Bible version with the given data']);
                    break;
                
                default:
                    return response()->json(['error' => 'The version you are trying to add allready exist']);
                    break;
            }
        }
    }

    // private function log($toLog)
    // {
    //     echo( json_encode($toLog) );
    //     echo( "\n" );
    // }

    public function createLocal()
    {
        $path = storage_path() . "/json/bible.json";
        $res = json_decode(file_get_contents($path));
        $result = array();
        foreach ($res->list as $request )
        {
            $version_result = $this->checkVersion($request->version_data);
            $result_temp = null;
            switch ($version_result["status"]) {
                case 'NEW' || 'FOUND':
                    $result_temp = $this->createBible($request, $version_result["value"]);
                    break;
                case 'ERROR':
                    $result_temp = ['error' => 'Error trying to retrieve Bible version with the given data'];
                    break;
                
                default:
                    $result_temp = ['error' => 'D: Error trying to retrieve Bible version with the given data'];
                    break;
            }
            array_push($result, [
                'version_ref' => $request->version_data->version_ref,
                'result' => $result_temp,
            ]);
        }
        return response()->json($result);
    }

    private function checkVersion($data)
    {
        try {
            $found_version = BblVersion::where('name', $data->version)
                            ->where('short', $data->version_ref);
            if ($found_version->count() != 0) {
                return array("status" => "FOUND", "value" => $found_version->first());
            }
            $version = BblVersion::create([
                'name' => $data->version,
                'short' => $data->version_ref,
                'language' => $data->language,
                's_language' => $data->language_ref
              ]);
              return array("status" => "NEW", "value" => $version);
        } catch (Illuminate\Database\QueryException $e) {
            return array("status" => "NOT", "value" => null);
        } catch (PDOException $e) {
            return array("status" => "ERROR", "value" => $version);
        }
    }

    private function createBible($data, $version)
    {
        $result = array();
        foreach ($data->version as $key => $book) {
            $naming = $this->getBookShort($book->book_nr, $version->language);
            $containedBook = array_filter($version->books->all(), function($value, $key) use ($naming) {
                return $value->name == $naming["name"];
            }, ARRAY_FILTER_USE_BOTH);
            $myBook = null;
            if (empty($containedBook))
            {
                $found_book = BblBook::where('name', 'like', $naming["name"])->first();
                if (!$found_book || $found_book->count() == 0)
                {
                    $myBook = $version->books()->save(BblBook::create([
                        'name' => $naming["name"],
                        'short' => $naming["short"],
                        'book_nr' => $book->book_nr
                    ]));
                } else {
                    $myBook = $found_book;
                    $test = $version->books()->save($found_book);
                }
            } else
            {
                $myBook = array_values($containedBook)[0];
            }

            if ($myBook->verses()->count() == 0)
            {
                foreach ($book->book as $chapterId => $chapter) {
                    foreach ($chapter->chapter as $verseId => $verse) {
                        $createdVerse = $myBook->verses()->create([
                            'chapter_nr' => $chapterId,
                            'verse' => $verse->verse,
                            'verse_nr' => $verse->verse_nr,
                        ]);
                    }
                }
                array_push($result, "New book added");
            } else  {
                array_push($result, "Book already stored");
            }
        }
        return  $result;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function bibleSearch(Request $request)
    {

    }

    private function getBookShort($book_identifier, $language)
    {
        $shorts = BibleBookShortUtils::getShortMap($language);
        if ($language == "Francais") {
            $book_naming = array_filter($shorts, function($key) use ($book_identifier) {
                return $key == $book_identifier;
            }, ARRAY_FILTER_USE_KEY);
            return $book_naming[$book_identifier];
        } else {
            return $shorts[$book_identifier];
        }
    }
}