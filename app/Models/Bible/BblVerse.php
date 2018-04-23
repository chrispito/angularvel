<?php

namespace App\Models\Bible;

use Illuminate\Database\Eloquent\Model;

class BblVerse extends Model
{
    protected $fillable = ['verse', 'verse_nr', 'chapter_nr'];

    public function book()
    {
      return $this->belongsTo('App\Models\Bible\BblBook');
    }
}
