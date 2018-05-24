<?php

namespace App\Models\Bible;

use Illuminate\Database\Eloquent\Model;

class BiblePerson extends Model
{
    protected $table = "bible_persons";
    
    protected $fillable = [
      'b_name',
      'gg_name',
      'gender',
    ];

    // public function parent()
    // {
    //   return $this->belongsTo('App\Models\Bible\BiblePerson', 'parent_id');
    // }

    public function childs()
    {
      return $this->hasMany('App\Models\Bible\BiblePerson', 'parent_id');
    }
}
