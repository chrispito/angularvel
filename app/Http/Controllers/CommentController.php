<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transformers\CommentTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Comment;
use JWTAuth;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = JWTAuth::toUser(JWTAuth::getToken());
        return fractal($user->comments, new CommentTransformer)
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
        $comment = $user->comments()->create([
          'title' => $request->title,
          'comment' => $request->comment
        ]);
        return fractal($comment, new CommentTransformer);
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
          $comment = Comment::findOrFail($id);
        } catch (ModelNotFoundException $e) {
          return response()->json(['error' => 'Comment Not Found Error']);
        }

        return fractal($comment, new CommentTransformer);
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
        $comment = Comment::findOrFail($id);
      } catch (ModelNotFoundException $e) {
        return response()->json(['error' => $e->getMessage()]);
      }

      $user = JWTAuth::toUser(JWTAuth::getToken());
      if ($user->id !== $comment->user_id) {
        return response()->json(['error' => 'Unauthenticated.'], 401);
      }
      $comment->title = $request->title;
      $comment->comment = $request->comment;
      $comment->save();
      return fractal($comment, new CommentTransformer);
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
        $comment = Comment::findOrFail($id);
      } catch (ModelNotFoundException $e) {
        return response()->json(['error' => $e->getMessage()]);
      }

      $user = JWTAuth::toUser(JWTAuth::getToken());
      if ($user->id !== $comment->user_id) {
        return response()->json(['error' => 'Unauthenticated.'], 401);
      }
      $comment->delete();
      return response()->json(['status' => true], 200);
    }
}
