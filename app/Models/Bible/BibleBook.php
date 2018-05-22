<?php

namespace App\Models\Bible;

use Illuminate\Database\Eloquent\Model;

class BibleBook extends Model
{
    protected $fillable = ['b_number', 'b_name', 'b_short'];

    public function versions()
    {
      return $this->belongsToMany('App\Models\Bible\BibleVersion');
    }

}
