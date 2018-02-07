<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transformers\AboutTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\About;

class AboutController extends Controller
{
    /**
     * Get the about data
     *
     * We always return the first one because we should only have one about.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAbout()
    {
      $about = About::find(1);
      if (!$about) {
        return response()->json(['error' => 'About Not Found']);
      }
      return fractal($about, new AboutTransformer);
      // return response()->json($about);
    }

    /**
     * Update the about content
     *
     * @return \Illuminate\Http\Response
     */
    public function update()
    {
      $about = About::where('id', 1);
      if (!$about) {
        return response()->json(['error' => 'About Not Found']);
      }
      $about->title = $request->title;
      $about->sub_title = $request->subTitle;
      $about->desc_label = $request->descLabel;
      $about->description = $request->description;
      foreach ($request->sections as $section){
        $about->sections()->where('id', $section->id)->update(['label' => $section->label]);
        $about->sections()->where('id', $section->id)->update(['text' => $section->text]);
      }
      $about->save();
      return fractal($about, new AboutTransformer);
    }

}
