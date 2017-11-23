<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Like;
use App\Joke;
use App\Transformers\JokeTransformer;
use JWTAuth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class LikesController extends Controller
{
    public function like()
    {
      $user = JWTAuth::toUser(JWTAuth::getToken());
      $joke_id = request('joke_id');
      try {
        $joke = Joke::findOrFail($joke_id);
      } catch (ModelNotFoundException $e) {
        return response()->json(['error' => $e->getMessage()]);
      }

      Like::create([
        'user_id' => $user->id,
        'joke_id' => $joke->id
      ]);

      return fractal($joke, new JokeTransformer);
    }

    public function unLike()
    {
      $user = JWTAuth::toUser(JWTAuth::getToken());
      $joke_id = request('joke_id');
      try {
        $joke = Joke::findOrFail($joke_id);
      } catch (ModelNotFoundException $e) {
        return response()->json(['error' => $e->getMessage()]);
      }

      $like = Like::where('user_id', $user->id)
                    ->where('joke_id', $joke->id)->first();
      if (!$like) {
        return response()->json(['error' => 'Joke Not Found']);
      }
      $like->delete();
      return response()->json(['Status' => true]);
    }
}
