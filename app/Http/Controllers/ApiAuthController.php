<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class ApiAuthController extends Controller
{
    /**
    Get user date & check if user credential are corect!
    Generate a tocken
    */
    public function authenticate()
    {
      $credentials = request()->only('email', 'password');
      try {
        $token = JWTAuth::attempt($credentials);
        if (!$token) {
          return response()->json(['error' => 'is invalid credentials'], 401);
        }
      } catch (JWTException $e) {
        return response()->json(['error' => 'Something Wrong'], 500);
      }
      return response()->json(['token' => $token], 200);
    }

    public function register()
    {
      $email = request()->email;
      $password = request()->password;
      $name = request()->name;

      $user = User::create([
        'name' => $name,
        'email' => $email,
        'password' => bcrypt($password)
      ]);

      $token = JWTAuth::fromUser($user);

      return response()->json(['token' => $token], 200);
    }
}
