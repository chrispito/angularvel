<?php

namespace App\Models\Bible;

use Illuminate\Database\Eloquent\Model;

class BibleVerse extends Model
{
    protected $fillable = [
      'key',
      'b',
      'c',
      'v',
      'verse',
      'version'
    ];

    public function versions()
    {
      return $this->belongsToMany('App\Models\Bible\BibleVersion');
    }
}
