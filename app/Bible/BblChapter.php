<?php

namespace App\Bible;

use Illuminate\Database\Eloquent\Model;

class BblChapter extends Model
{
    protected $fillable = ['chapter_nr'];

    public function book()
    {
      return $this->belongsTo('App\Bible\BblBook');
    }

    public function verses()
    {
      return $this->hasMany('App\Bible\BblVerse');
    }
}
