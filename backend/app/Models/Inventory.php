<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'unit',
        'price',
        'date_of_expiry',
        'available_inventory',
        'image',
    ];
}
