<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BblVerse;

class BblVerseTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BblVerse $verse)
    {
        return [
            'verse' => $verse->name,
            'chapter_nr' => $verse->chapter_nr,
            'verse_nr' => $verse->verse_nr,
        ];
    }
}
