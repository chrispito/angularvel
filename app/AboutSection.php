<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
  protected $fillable = ['label', 'text'];

  public function about()
  {
    return $this->belongsTo('App\About');
  }
}
