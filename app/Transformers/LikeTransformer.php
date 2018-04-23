<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Like;

class LikeTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Like $like)
    {
        return [
            'user' => [
              'id' => $like->user->id,
              'id' => $like->user->name
            ],

            'liked_date' => $like->created_at->toFormattedDateString()
        ];
    }
}
