<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Joke;

class JokeTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Joke $joke)
    {
        return [
            'id' => $joke->id,
            'title' => $joke->title,
            'joke' => $joke->joke,
            'created_at' => $joke->created_at->toFormattedDateString()
        ];
    }
}
