<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BibleVersion;

class BibleSearchTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BibleVersion $version)
    {
        return [
            'id' => $version->id,
            'name' => $version->name,
            'short' => $version->short,
            'books' => fractal($version->books, new BibleBookTransformer)
        ];
    }
}
