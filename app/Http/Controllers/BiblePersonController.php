<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Bible\BiblePerson;
use App\Transformers\BiblePersonTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BiblePersonController extends Controller
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
    private function addNewPerson($request)
    {
        $validator = Validator::make($request, [
            'name' => 'required|string',
            'changed_name' => 'string',
            'gender' => 'string',
            'parent_id' => 'integer'
        ]);

        if ($validator->fails()) {
            return array("status" => "ERROR", "value" => $validator->errors());
        }

        $parentId = array_key_exists('parent_id', $request) ? $request['parent_id'] : null;
        $name = array_key_exists('name', $request) ? $request['name'] : null;
        $changedName = array_key_exists('changed_name', $request) ? $request['changed_name'] : null;
        $gender = array_key_exists('gender', $request) ? $request['gender'] : null;

        if ($parentId) {
            try {
                $parent = BiblePerson::findOrFail($parentId);
                $parent->childs()->create([
                    'b_name' => $name,
                    'gg_name' => $changedName,
                    'gender' => $gender
                ]);
                return array("status" => "OK", "value" => $parent);
            } catch (ModelNotFoundException $e) {
                return array("status" => "ERROR", "value" => $e->getMessage());
            }
        } else {
            $person = BiblePerson::create([
                'b_name' => $name,
                'gg_name' => $changedName,
                'gender' => $gender
            ]);
        }
        return array("status" => "OK", "value" => $person);
    }

    public function add(Request $request)
    {
        return $this->addNewPerson($request->all());
    }

    public function adds(Request $request)
    {
        $result = array();
        foreach ($request->all() as $single ) {
            $this->log($single);
            $response = $this->addNewPerson($single);
            switch ($response["status"]) {
                case 'OK':
                    array_push($result, [
                        'name' => $single['name'],
                        'result' => $response['value'],
                    ]);
                    break;
                case 'ERROR':
                    array_push($result, [
                        'name' => $single['name'],
                        'result' => $response['value'],
                    ]);
                    break;
                
                default:
                    break;
            }
        }
        return $result;
    }

    private function log($toLog)
    {
        echo( json_encode($toLog) );
        echo( "\n" );
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
    public function get(Request $request)
    {
        try {
            $person = BIblePerson::findOrFail($request->id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['STATUS' => "FAIL", "data" => $e->getMessage()]);
        }
        return fractal($person, new BiblePersonTransformer);
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

}