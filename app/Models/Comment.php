<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['title', 'comment'];

    public function user()
    {
      return $this->belongsTo('App\Models\User');
    }

    public function likes()
    {
      return $this->hasMany('App\Models\Like');
    }
}
