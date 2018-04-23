<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
  protected $fillable = ['title'];

  public function sections()
  {
    return $this->hasMany('App\Models\AboutSection');
  }
}
