<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBibleVerses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bible_verses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('key');
            $table->integer('b');
            $table->integer('c');
            $table->integer('v');
            $table->text('verse');
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
        Schema::dropIfExists('bible_verses');
    }
}
