<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BibleVersion;

class BibleVersionTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BibleVersion $version)
    {
        return [
            'name' => $version->v_name,
            'short' => $version->v_short,
        ];
    }
}
