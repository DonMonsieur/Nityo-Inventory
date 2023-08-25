<?php

namespace Database\Seeders;

use App\Models\Inventory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        for ($i = 0; $i < 100; $i++) {
            $product_name = 'Product ' . ($i + 1);
            
            while (Inventory::where('product_name', $product_name)->exists()) {
                $product_name = 'Product ' . ($i + 1) . '-' . rand(1, 1000);
            }

            Inventory::create([
                'product_name' => $product_name,
                'unit' => 'kg',
                'price' => 1,
                'date_of_expiry' => '2023-12-31',
                'available_inventory' => 100,
                'image' => 'kgsad',
            ]);
        }
    }
}
