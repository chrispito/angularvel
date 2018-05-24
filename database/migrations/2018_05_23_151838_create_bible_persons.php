<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBiblePersons extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bible_persons', function (Blueprint $table) {
            $table->increments('id');
            $table->string('b_name')->comment("Birth name");
            $table->string('gg_name')->comment("God given name")->nullable();
            $table->enum('gender', ['MALE', 'FEMALE'])->default('MALE');
            $table->integer('parent_id')->nullable()->unsigned()->index();
            $table->foreign('parent_id')->references('id')->on('bible_persons')->onDelete('cascade');
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
        Schema::dropIfExists('bible_persons');
    }
}
