<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
  protected $fillable = ['title'];

  public function sections()
  {
    return $this->hasMany('App\AboutSection');
  }
}
