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
      factory(\App\User::class, 6)->create()->each(
        function($user) {
          for ($i = 0; $i < 10; $i++) {
            $user->jokes()->save(factory(\App\Joke::class)->make());
          }
        }
      );
    }
}
