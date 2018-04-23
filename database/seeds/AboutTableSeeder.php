<?php

use Illuminate\Database\Seeder;

class AboutTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      factory(\App\Models\About::class, 1)->create()->each(
        function($about) {
          for ($i = 0; $i < 4; $i++) {
            $about->sections()->save(factory(\App\Models\AboutSection::class)->make());
          }
        }
      );
    }
}
