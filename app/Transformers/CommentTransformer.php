<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Comment;

class CommentTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Comment $comment)
    {
        return [
            'id' => $comment->id,
            'title' => $comment->title,
            'comment' => $comment->comment,
            'created_at' => $comment->created_at->toFormattedDateString(),
            'creator' => fractal($comment->user, new UserTransformer),
            'likes' => fractal($comment->likes, new LikeTransformer)
        ];
    }
}
