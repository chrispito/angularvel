<?php

use Illuminate\Database\Seeder;

class BblLanguagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bbl_languages')->insert([
            'name' => "Francais",
            'short' => "fr"
        ]);
        DB::table('bbl_languages')->insert([
            'name' => "Deutsch",
            'short' => "de"
        ]);
        DB::table('bbl_languages')->insert([
            'name' => "Englich",
            'short' => "en"
        ]);
    }
}
