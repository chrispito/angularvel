<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BibleVerse;

class BibleVerseTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BibleVerse $verse)
    {
        return [
            'verse' => $verse->verse,
            'book_number' => $verse->b,
            'chapter_number' => $verse->c,
            'verse_number' => $verse->v,
            'key' => $verse->key,
        ];
    }
}
