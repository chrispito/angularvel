<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\About;

class AboutTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(About $about)
    {
        return [
            'id' => $about->id,
            'title' => $about->title,
            'subTitle' => $about->sub_title,
            'descLabel' => $about->desc_label,
            'description' => $about->description,
            'sections' => fractal($about->sections, new AboutSectionTransformer)
        ];
    }
}
