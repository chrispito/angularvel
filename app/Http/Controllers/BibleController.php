<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Bible\BibleVersion;
use App\Models\Bible\BibleBook;
use App\Utils\BibleBookShortUtils;
use App\Transformers\BibleSearchTransformer;
use App\Transformers\BibleBookTransformer;
use Illuminate\Http\Request;
// use Request;

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
        $result = array();
        foreach ($requestList->list as $request )
        {
            $uri = "http://getbible.net/json?version=" . $request['version_ref'];
            $res = \Httpful\Request::get($uri)->send();
            $bible = substr($res->body, 0, -2);
            $bible = substr($bible, 1); 
            $bible = json_decode($bible);

            $version_result = $this->checkVersion($request);
            $result_temp = null;
            switch ($version_result["status"]) {
                case 'NEW' || 'FOUND':
                    $result_temp = $this->createBible($bible, $version_result["value"]);
                    break;
                case 'ERROR':
                    $result_temp = ['error' => 'Error trying to retrieve Bible version with the given data'];
                    break;
                
                default:
                    $result_temp = ['error' => 'D: Error trying to retrieve Bible version with the given data'];
                    break;
            }

            array_push($result, [
                'version_ref' => $request['version_ref'],
                'result' => $result_temp,
            ]);
        }
        return response()->json($result);
    }

    private function checkVersion($data)
    {
        try {
            $found_version = BibleVersion::where('v_name', $data['version'])
                            ->where('v_short', $data['version_ref']);
            if ($found_version->count() != 0) {
                return array("status" => "FOUND", "value" => $found_version->first());
            }
            $version = BibleVersion::create([
                'v_name' => $data['version'],
                'v_short' => $data['version_ref'],
                'l_name' => $data['language'],
                'l_short' => $data['language_ref']
              ]);
              return array("status" => "NEW", "value" => $version);
        } catch (Illuminate\Database\QueryException $e) {
            return array("status" => "NOT", "value" => null);
        } catch (PDOException $e) {
            return array("status" => "ERROR", "value" => $version);
        }
    }

    private function log($toLog)
    {
        echo( json_encode($toLog) );
        echo( "\n" );
    }

    public function createLocal()
    {
        $path = storage_path() . "/json/bible.json";
        $res = json_decode(file_get_contents($path));
        $result = array();
        foreach ($res->list as $request )
        {
            $version_result = $this->checkVersion_local($request->version_data);
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

    private function checkVersion_local($data)
    {
        $this->log($data["version"]);
        try {
            $found_version = BibleVersion::where('v_name', $data->version)
                            ->where('v_short', $data->version_ref);
            if ($found_version->count() != 0) {
                return array("status" => "FOUND", "value" => $found_version->first());
            }
            $version = BibleVersion::create([
                'v_name' => $data->version,
                'v_short' => $data->version_ref,
                'l_name' => $data->language,
                'l_short' => $data->language_ref
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
            $naming = $this->getBookShort($book->book_nr, $version->l_name);
            $found_book = BibleBook::where('b_name', $naming["name"])
                            ->where('b_short', $naming["short"])
                            ->where('bible_version_id', $version->id);
            $myBook = null;
            if (!$found_book->first())
            {
                $myBook = $version->books()->create([
                    'b_name' => $naming["name"],
                    'b_short' => $naming["short"],
                    'b_number' => $book->book_nr
                ]);
            } else
            {
                $myBook = $found_book->first();
            }
            if (empty($version->verses->all())) {
                foreach ($book->book as $chapterId => $chapter) {
                    foreach ($chapter->chapter as $verseId => $verse) {
                        $v_key = sprintf("%'.02d", $myBook->b_number) . sprintf("%'.03d", $chapterId). sprintf("%'.03d", $verseId);
    
                        $containedVerses = array_filter($version->verses->all(), function($verse, $key) use ($v_key) {
                            return $verse->key == $v_key;
                        }, ARRAY_FILTER_USE_BOTH);
                        if (empty($containedVerses)) {
                            $createdVerse = $version->verses()->create([
                                'key' => intval($v_key),
                                'b' => $myBook->b_number,
                                'c' => $chapterId,
                                'v' => $verseId,
                                'verse' => $verse->verse,
                            ]);
                            array_push($result, "New verse added");
                        } else {
                            array_push($result, "Verse already stored");
                        }
                    }
                }
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