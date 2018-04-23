<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Illuminate\Support\Facades\Auth;

class AdminGuard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $user = JWTAuth::toUser(JWTAuth::getToken());
        if (!$user->roles->contains(\App\Models\Role::where('name', 'Admin')->first()->id)) {
            return response()->json(['error' => "Not Authorized!"], 500);
        }

        return $next($request);
    }
}
