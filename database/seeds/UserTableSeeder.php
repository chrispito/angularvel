<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      factory(\App\Models\User::class, 6)->create()->each(
        function($user) {
          for ($i = 0; $i < 10; $i++) {
            $user->comments()->save(factory(\App\Models\Comment::class)->make());
          }
          if ($user->email == "admin@example.net") {
            $user->roles()->save(\App\Models\Role::where('name', 'Admin')->first());
          }else {
            $user->roles()->save(\App\Models\Role::where('name', 'User')->first());
          }
        }
      );
    }
}
