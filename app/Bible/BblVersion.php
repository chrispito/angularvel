<?php

namespace App\Bible;

use Illuminate\Database\Eloquent\Model;

class BblVersion extends Model
{
    protected $fillable = ['name', 'short'];

    public function laguage()
    {
      return $this->belongsTo('App\Bible\BblLanguage');
    }

    public function books()
    {
      return $this->hasMany('App\Bible\BblBook');
    }
}
