<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('inventories')->insert([
            ['product_name' => 'Kilogram', 'unit' => 'kg', 'price' => 1, 'date_of_expiry' => '2023-12-31', 'available_inventory' => 100, 'image' => 'kgsad'],
            ['product_name' => 'Gram', 'unit' => 'g', 'price' => 2, 'date_of_expiry' => '2023-12-31', 'available_inventory' => 200, 'image' => 'gasd'],
            ['product_name' => 'Pieces', 'unit' => 'pcs', 'price' => 3, 'date_of_expiry' => '2023-12-31', 'available_inventory' => 50, 'image' => 'pcsasd'],
        ]);
    }
}
