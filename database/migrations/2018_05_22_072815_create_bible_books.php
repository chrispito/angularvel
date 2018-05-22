<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBibleBooks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bible_books', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('b_number');
            $table->string('b_name');
            $table->string('b_short');
            $table->integer('bible_version_id')->unsigned()->index();
            $table->foreign('bible_version_id')->references('id')->on('bible_versions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bible_books');
    }
}
