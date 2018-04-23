<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/authenticate', [
  'uses' => 'ApiAuthController@authenticate'
]);

Route::post('/register', [
  'uses' => 'ApiAuthController@register'
]);

Route::get('/about', [
  'uses' => 'AboutController@getAbout'
]);

Route::get('/slider-images', [
  'uses' => 'ImageController@getSliderImage'
]);

Route::group(['prefix' => '/bible-search'], function () {
  Route::get('/', [
    'uses' => 'BibleSearchController@search'
  ]);
  Route::get('/versions', [
    'uses' => 'BibleSearchController@findVersions'
  ]);
});

Route::group(['middleware' => 'jwt.auth'], function () {
  Route::group(['middleware' => 'admin'], function () {
    Route::get('/user', function (Request $request) {
      $token = JWTAuth::getToken();
      $user = JWTAuth::toUser($token);
  
      return fractal($user, new \App\Transformers\UserTransformer);
    });
    Route::post('/updateAdbout', [
      'uses' => 'AboutController@update'
    ]);
  
    Route::post('/bible/create', [
      'uses' => 'BibleController@create'
    ]);

    Route::post('/bible/create_local', [
      'uses' => 'BibleController@createLocal'
    ]);
  });
});
