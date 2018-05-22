<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BblVersion;

class BblSearchTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BblVersion $version)
    {
        return [
            'id' => $version->id,
            'name' => $version->name,
            'short' => $version->short,
            'books' => fractal($version->books, new BblBookTransformer)
        ];
    }
}
