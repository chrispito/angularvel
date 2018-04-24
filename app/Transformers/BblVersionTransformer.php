<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BblVersion;

class BblVersionTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BblVersion $version)
    {
        return [
            'name' => $version->name,
            'short' => $version->short,
        ];
    }
}
