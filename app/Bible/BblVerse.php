<?php

namespace App\Bible;

use Illuminate\Database\Eloquent\Model;

class BblVerse extends Model
{
    protected $fillable = ['verse', 'verse_nr'];

    public function chapter()
    {
      return $this->belongsTo('App\Bible\BblChapter');
    }
}
