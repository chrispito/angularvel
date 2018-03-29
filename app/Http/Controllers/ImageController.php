<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transformers\AboutTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ImageController extends Controller
{
    /**
     * Get the all image for the slider
     *
     * @return \Illuminate\Http\Response
     */
    public function getSliderImage()
    {
      //TODO: Get Images from public files
      return  response()->json("image-test", 200);
    }

}
