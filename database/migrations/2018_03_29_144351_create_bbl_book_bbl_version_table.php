<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBblBookBblVersionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bbl_book_bbl_version', function (Blueprint $table) {
            $table->integer('bbl_book_id')->unsigned()->index();
            $table->foreign('bbl_book_id')->references('id')->on('bbl_books')->onDelete('cascade');
            $table->integer('bbl_version_id')->unsigned()->index();
            $table->foreign('bbl_version_id')->references('id')->on('bbl_versions')->onDelete('cascade');
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
        Schema::dropIfExists('bbl_book_bbl_version');
    }
}
