<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Affiliate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'comission',
        'document',
        'document_type',
        'address',
        'bank_data',
        'afiliated_observation',
    ];

    protected $casts = [
        'address' => 'array',
    ];
}