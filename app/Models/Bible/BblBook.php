<?php

namespace App\Models\Bible;

use Illuminate\Database\Eloquent\Model;

class BblBook extends Model
{
    protected $fillable = ['name', 'short', 'book_nr'];

    public function versions()
    {
      return $this->belongsToMany('App\Models\Bible\BblVersion');
    }

    public function verses()
    {
      return $this->hasMany('App\Models\Bible\BblVerse');
    }
}
