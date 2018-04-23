<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    static $password;
    static $type;
    static $email;

    return [
        'name' => $faker->name,
        'email' => $email ? $faker->unique()->safeEmail : $email = 'admin@example.net',
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Models\Comment::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->sentence(4),
        'comment' => $faker->paragraph(6)
    ];
});
$factory->define(App\Models\About::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->sentence(4),
        'sub_title' => $faker->paragraph(2),
        'desc_label' => $faker->sentence(4),
        'description' => $faker->paragraph(3)
    ];
});
$factory->define(App\Models\AboutSection::class, function (Faker\Generator $faker) {
    return [
        'label' => $faker->sentence(2),
        'text' => $faker->paragraph(6)
    ];
});
