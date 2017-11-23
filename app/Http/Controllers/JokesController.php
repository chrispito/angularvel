<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transformers\JokeTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Joke;
use JWTAuth;

class JokesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = JWTAuth::toUser(JWTAuth::getToken());
        return fractal($user->jokes, new JokeTransformer)
                ->respond(200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = JWTAuth::toUser(JWTAuth::getToken());
        $joke = $user->jokes()->create([
          'title' => $request->title,
          'joke' => $request->joke
        ]);
        return fractal($joke, new JokeTransformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
          $joke = Joke::findOrFail($id);
        } catch (ModelNotFoundException $e) {
          return response()->json(['error' => 'Joke Not Found Error']);
        }

        return fractal($joke, new JokeTransformer);
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
      try {
        $joke = Joke::findOrFail($id);
      } catch (ModelNotFoundException $e) {
        return response()->json(['error' => $e->getMessage()]);
      }

      $user = JWTAuth::toUser(JWTAuth::getToken());
      if ($user->id !== $joke->user_id) {
        return response()->json(['error' => 'Unauthenticated.'], 401);
      }
      $joke->title = $request->title;
      $joke->joke = $request->joke;
      $joke->save();
      return fractal($joke, new JokeTransformer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try {
        $joke = Joke::findOrFail($id);
      } catch (ModelNotFoundException $e) {
        return response()->json(['error' => $e->getMessage()]);
      }

      $user = JWTAuth::toUser(JWTAuth::getToken());
      if ($user->id !== $joke->user_id) {
        return response()->json(['error' => 'Unauthenticated.'], 401);
      }
      $joke->delete();
      return response()->json(['status' => true], 200);
    }
}
