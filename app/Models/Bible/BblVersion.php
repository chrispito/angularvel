<?php

namespace App\Models\Bible;

use Illuminate\Database\Eloquent\Model;

class BblVersion extends Model
{
    protected $fillable = ['name', 'short', 'language', 's_language'];

    // public function laguage()
    // {
    //   return $this->belongsTo('App\Models\Bible\BblLanguage');
    // }

    public function books()
    {
      return $this->belongsToMany('App\Models\Bible\BblBook');
    }
}
