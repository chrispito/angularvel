<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Bible\BiblePerson;

class BiblePersonTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(BiblePerson $person)
    {
        return [
            'name' => $person->b_name,
            'changed_name' => $person->gg_name,
            'gender' => $person->gender,
            // 'parents' => $person->parent ? fractal($person->parent, new BiblePersonTransformer) : null,
            'childs' => fractal($person->childs, new BiblePersonTransformer)
        ];
    }
}
