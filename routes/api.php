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

// Route::middleware(['jwt.auth'])->group(function () {
Route::group(['middleware' => 'jwt.auth'], function () {
  Route::get('/user', function (Request $request) {
    $token = JWTAuth::getToken();
    $user = JWTAuth::toUser($token);

    return fractal($user, new \App\Transformers\UserTransformer);
  });

  
  Route::post('/updateAdbout', [
    'uses' => 'AboutController@update'
  ]);
});




// Route::get('/comments', function() {
//   $user = JWTAuth::toUser(JWTAuth::getToken());
//   return fractal($user->jokes, new \App\Transformers\JokeTransformer);
// });

// Route::resource('comments', 'CommentController');

// Route::post('/like', [
//   'uses' => 'LikesController@like'
// ]);
// Route::post('/unlike', [
//   'uses' => 'LikesController@unlike'
// ]);
