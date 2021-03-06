<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BblBook;

class BblBookTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BblBook $book)
    {
        return [
            'name' => $book->name,
            'short' => $book->short,
            'book_nr' => $book->book_nr,
        ];
    }
}
