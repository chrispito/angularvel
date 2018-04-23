<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Role;

class RolesTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Role $role)
    {
        return [
            'id' => $role->id,
            'name' => $role->name,
        ];
    }
}
