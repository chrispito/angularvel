<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBBLVersesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bbl_verses', function (Blueprint $table) {
            $table->increments('id');
            $table->text('verse');
            $table->integer('verse_nr');
            $table->integer('bbl_chapter_id')->unsigned();
            $table->timestamps();
            $table->foreign('bbl_chapter_id')->references('id')->on('bbl_chapters')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bbl_verses');
    }
}
