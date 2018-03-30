<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBBLChaptersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bbl_chapters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('chapter_nr');
            $table->integer('bbl_book_id')->unsigned();
            $table->timestamps();
            $table->foreign('bbl_book_id')->references('id')->on('bbl_books')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bbl_chapters');
    }
}
