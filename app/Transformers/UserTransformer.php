<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\User;

class UserTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(user $user)
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'type' => $user->type,
            'joined' => $user->created_at->toFormattedDateString()

        ];
    }
}
