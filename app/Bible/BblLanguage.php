<?php

namespace App\Bible;

use Illuminate\Database\Eloquent\Model;

class BblLanguage extends Model
{
    protected $fillable = ['name', 'short'];

    public function versions()
    {
      return $this->hasMany('App\Bible\BblVersion');
    }
}
