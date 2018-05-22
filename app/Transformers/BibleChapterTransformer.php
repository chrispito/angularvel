<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BibleVerse;

class BibleChapterTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BibleVerse $verse)
    {
        return [
            'book_number' => $verse->b,
            'chapter_number' => $verse->c,
        ];
    }
}
