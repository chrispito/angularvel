<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Bible\BblVersion;
use App\Models\Bible\BblBook;
use App\Utils\BibleBookShortUtils;
use App\Transformers\BibleSearchTransformer;
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
    /**
     * Find all books by version from the store
     *
     * @return \Illuminate\Http\Response
     */
    public function findChaptersByBook(Request $request)
    {
        $book = BblBook::where('name', 'like', $request->book)->first();

        if ($version && $version->count() != 0) {
            return fractal($version->books, new BblBookTransformer);
        } else {
            return response()->json("No Books Found", 404);
        }
    }

}