<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
           $table->dropColumn('middle_name');
           $table->dropColumn('last_name');
           
           $table->string('social_name')->nullable()->after('first_name');
           $table->longText('address')->nullable()->after('social_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};