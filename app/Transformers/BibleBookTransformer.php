<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BibleBook;

class BibleBookTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BibleBook $book)
    {
        return [
            'name' => $book->b_name,
            'short' => $book->b_short,
            'book_nr' => $book->b_number,
        ];
    }
}
