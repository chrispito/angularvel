<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Bible\BblLanguage;
use App\Bible\BblVersion;
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
    public function create(Request $request)
    {
        $uri = 'http://getbible.net/json?version=' . $request->version_ref;
        $res = \Httpful\Request::get($uri)->send();
        $bible = substr($res->body, 0, -2);
        $bible = substr($bible, 1); 
        $bible = json_decode($bible, true);
        try {
            $language = BblLanguage::where('name', $request->language)
                            ->where('short', $request->language_ref);
            if ($language->count() == 0) {
                return response()->json(['error' => 'Language not found in the DB']);
            }
            
            
            $version = $language->first()->versions()->create([
                'name' => $request->version,
                'short' => $request->version_ref
            ]);
        } catch (Illuminate\Database\QueryException $e) {
            return response()->json(['error' => 'This version is already stored!']);
        } catch (PDOException $e) {
            return response()->json(['error' => 'Error trying to retrieve Bible version with the given data']);
        }  

        foreach ($bible['version'] as $bookId => $book) {
            $createdBook = $version->books()->create([
                'name' => $book['book_name'],
                'short' => $this->getBookShort($book['book_name']),
                'book_nr' => $book['book_nr']
            ]);
            
            foreach ($book['book'] as $chapterId => $chapter) {
                $createdChapter = $createdBook->chapters()->create([
                    'chapter_nr' => $chapter['chapter_nr'],
                ]);
                
                foreach ($chapter['chapter'] as $verseId => $verse) {
                    $createdChapter->verses()->create([
                        'verse_nr' => $verse['verse_nr'],
                        'verse' => $verse['verse'],
                    ]);
                }
            }
        }

        return  response()->json(["OK" => "Saved Sucessfully"], 200);
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

    // private function CallAPI($method, $url, $data = false)
    // {
    //     $curl = curl_init();

    //     switch ($method)
    //     {
    //         case "POST":
    //             curl_setopt($curl, CURLOPT_POST, 1);

    //             if ($data)
    //                 curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    //             break;
    //         case "PUT":
    //             curl_setopt($curl, CURLOPT_PUT, 1);
    //             break;
    //         default:
    //             if ($data)
    //                 $url = sprintf("%s?%s", $url, http_build_query($data));
    //     }

    //     // Optional Authentication:
    //     // curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    //     // curl_setopt($curl, CURLOPT_USERPWD, "username:password");
    //     var_dump($url);
    //     curl_setopt($curl, CURLOPT_URL, $url);
    //     curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    //     var_dump($curl);
        
    //     $result = curl_exec($curl);
    //     var_dump($result);

    //     curl_close($curl);

    //     return $result;
    // }

    private function getBookShort($book_name)
    {
        $shorts = array(
            "Genesis"=>"Gen.", 
            "Exodus"=>"Ex.", 
            "Leviticus"=>"Lev.",
            "Numbers"=>"Num.",
            "Deuteronomy"=>"Deut.",
            "Joshua"=>"Josh.",
            "Judges"=>"Judg.",
            "Ruth"=>"Ruth",
            "1 Samuel"=>"1Sam.",
            "2 Samuel"=>"2Sam.",
            "1 Kings"=>"1Kings",
            "2 Kings"=>"2Kings",
            "1 Chronicles"=>"1Chron.",
            "2 Chronicles"=>"2Chron.",
            "Ezra"=>"Ezra",
            "Nehemiah"=>"Neh.",
            "Esther"=>"Est.",
            "Job"=>"Job",
            "Psalms"=>"Ps.",
            "Proverbs"=>"Prov.",
            "Ecclesiastes"=>"Eccles.",
            "Song of Songs"=>"Song",
            "Isaiah"=>"Isa.",
            "Jeremiah"=>"Jer.",
            "Lamentations"=>"Lam.",
            "Ezekiel"=>"Ezek.",
            "Daniel"=>"Dan.",
            "Hosea"=>"Hos.",
            "Joel"=>"Joel",
            "Amos"=>"Amos",
            "Obadiah"=>"Obad.",
            "Jonah"=>"Jonah",
            "Micah"=>"Mic.",
            "Nahum"=>"Nah.",
            "Habakkuk"=>"Hab.",
            "Zephaniah"=>"Zeph.",
            "Haggai"=>"Hag.",
            "Zechariah"=>"Zech.",
            "Malachi"=>"Mal.",

            "Matthew"=>"Matt.",
            "Mark"=>"Mark",
            "Luke"=>"Luke",
            "John"=>"John",
            "Acts"=>"Acts",
            "Romans"=>"Rom.",
            "1 Corinthians"=>"1Cor.",
            "2 Corinthians"=>"2Cor.",
            "Galatians"=>"Gal.",
            "Ephesians"=>"Eph.",
            "Philippians"=>"Phil.",
            "Colossians"=>"Col.",
            "1 Thessalonians"=>"1Thess.",
            "2 Thessalonians"=>"2Thess.",
            "1 Timothy"=>"1Tim.",
            "2 Timothy"=>"2Tim.",
            "Titus"=>"Titus",
            "Philemon"=>"Philem.",
            "Hebrews"=>"Heb.",
            "James"=>"James",
            "1 Peter"=>"1Pet.",
            "2 Peter"=>"2Pet.",
            "1 John"=>"1Joh.",
            "2 John"=>"2Joh.",
            "3 John"=>"3Joh.",
            "Jude"=>"Jude",
            "Revelation"=>"Rev.",
        );
        return $shorts[$book_name];
    }
}