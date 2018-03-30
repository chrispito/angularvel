<?php

namespace App\Bible;

use Illuminate\Database\Eloquent\Model;

class BblBook extends Model
{
    protected $fillable = ['name', 'short', 'book_nr'];

    public function version()
    {
      return $this->belongsTo('App\Bible\BblVersion');
    }

    public function chapters()
    {
      return $this->hasMany('App\Bible\BblChapter');
    }
}
