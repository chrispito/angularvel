<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BibleVersion;

class BibleLanguageTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BibleVersion $version)
    {
        return [
            'name' => $version->l_name,
            'short' => $version->l_short,
        ];
    }
}
