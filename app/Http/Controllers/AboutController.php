<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transformers\AboutTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\About;
use App\AboutSection;

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
    public function update(Request $request)
    {
      try {
        $about = About::findOrFail(1);
      } catch (ModelNotFoundException $e) {
        return response()->json(['error' => $e->getMessage()]);
      }
      
      $about->title = $request->title;
      $about->sub_title = $request->subTitle;
      $about->desc_label = $request->descLabel;
      $about->description = $request->description;
      foreach ($request->sections as $section){
        AboutSection::where('id', $section['id'])->update(['label' => $section['label'], 'text' => $section['text']]);
      }
      $about->save();
      return fractal($about, new AboutTransformer);
    }

}
