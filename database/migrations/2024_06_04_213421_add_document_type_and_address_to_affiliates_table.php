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
        Schema::table('affiliates', function (Blueprint $table) {
            // Movendo o campo `document` para o final
            $table->string('document')->nullable()->change(); 
            
            // Adicionando novos campos
            $table->enum('document_type', ['CPF', 'ID', 'Passport', 'Other'])->after('document')->nullable(); 
            $table->longText('address')->after('document_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('affiliates', function (Blueprint $table) {
            $table->dropColumn(['document_type', 'address']);
        });
    }
};