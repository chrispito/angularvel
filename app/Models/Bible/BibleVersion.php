<?php

namespace App\Models\Bible;

use Illuminate\Database\Eloquent\Model;

class BibleVersion extends Model
{
    protected $fillable = [
      'v_name',
      'v_short',
      'l_name',
      'l_short'
    ];


    public function books()
    {
      return $this->hasMany('App\Models\Bible\BibleBook');
    }

    public function verses()
    {
      return $this->hasMany('App\Models\Bible\BibleVerse');
    }
}
