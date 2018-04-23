<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Comment;
use App\Transformers\CommentTransformer;
use JWTAuth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class LikesController extends Controller
{
    public function like()
    {
      $user = JWTAuth::toUser(JWTAuth::getToken());
      $comment_id = request('comment_id');
      try {
        $comment = Comment::findOrFail($comment_id);
      } catch (ModelNotFoundException $e) {
        return response()->json(['error' => $e->getMessage()]);
      }

      Like::create([
        'user_id' => $user->id,
        'comment_id' => $comment->id
      ]);

      return fractal($comment, new CommentTransformer);
    }

    public function unLike()
    {
      $user = JWTAuth::toUser(JWTAuth::getToken());
      $comment_id = request('comment_id');
      try {
        $comment = Comment::findOrFail($comment_id);
      } catch (ModelNotFoundException $e) {
        return response()->json(['error' => $e->getMessage()]);
      }

      $like = Like::where('user_id', $user->id)
                    ->where('comment_id', $comment->id)->first();
      if (!$like) {
        return response()->json(['error' => 'Comment Not Found']);
      }
      $like->delete();
      return response()->json(['Status' => true]);
    }
}
