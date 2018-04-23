<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\AboutSection;

class AboutSectionTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(AboutSection $aboutSection)
    {
        return [
            'id' => $aboutSection->id,
            'label' => $aboutSection->label,
            'text' => $aboutSection->text,
        ];
    }
}
