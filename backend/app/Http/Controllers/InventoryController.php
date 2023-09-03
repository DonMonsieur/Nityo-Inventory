<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class InventoryController extends Controller
{

    public function getProduct()
    {
        try {
            $products = Inventory::orderByRaw('GREATEST(created_at, updated_at) DESC')
                ->get();

            return response()->json([
                'products' => $products,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong'
            ], 500);
        }
    }

    public function createProduct(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'product_name' => 'required|string|max:50|unique:inventories',
                'unit' => 'required|string|max:10',
                'price' => 'required|regex:/^\d+(\.\d{1,2})?$/',
                'date_of_expiry' => 'required|date_format:Y-m-d',
                'available_inventory' => 'required|integer',
                'image',
            ], [
                'product_name.required' => 'The product name field is required.',
                'product_name.string' => 'The product name field must be a string.',
                'product_name.max' => 'The product name field cannot exceed 50 characters.',
                'product_name.unique' => 'The product name has already been taken.',

                'unit.required' => 'The unit field is required.',
                'unit.string' => 'The unit field must be a string.',
                'unit.max' => 'The unit field cannot exceed 10 characters.',

                'price.required' => 'The price field is required.',
                'price.numeric' => 'The price field must be a numeric value.',

                'date_of_expiry.required' => 'The expiration date field is required.',
                'date_of_expiry.date_format' => 'The expiration date must be in the format YYYY-MM-DD.',

                'available_inventory.required' => 'The available inventory field is required.',
                'available_inventory.integer' => 'The available inventory field must be an integer.',

                'image'
            ]);

            if ($validator->fails()) {
                throw new \InvalidArgumentException($validator->errors()->first());
            }

            $product = new Inventory();
            $imagePath = $request->file('image')->store('images', 'public');

            $product->product_name = $request->input('product_name');
            $product->unit = $request->input('unit');
            $product->price = $request->input('price');
            $product->date_of_expiry = $request->input('date_of_expiry');
            $product->image = $imagePath;
            $product->available_inventory = $request->input('available_inventory');

            $product->save();

            return response()->json([
                'message' => 'Product created successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'product_name' => 'string|max:50|regex:/^[a-zA-Z0-9 ]+$/|unique:inventories,product_name,' . $request->id,
                'unit' => 'string|max:10|regex:/^[a-zA-Z0-9 ]+$/',
                'price' => 'numeric',
                'date_of_expiry' => 'date_format:Y-m-d',
                'available_inventory' => 'integer',
                'image',
            ], [
                'product_name.required' => 'The product name field is required.',
                'product_name.string' => 'The product name field must be a string.',
                'product_name.max' => 'The product name field cannot exceed 50 characters.',
                'product_name.regex' => 'The product name format is invalid.',
                'product_name.unique' => 'The product name has already been taken.',

                'unit.required' => 'The unit field is required.',
                'unit.string' => 'The unit field must be a string.',
                'unit.max' => 'The unit field cannot exceed 10 characters.',
                'unit.regex' => 'The unit format is invalid.',
                'unit.unique' => 'The unit has already been taken.',

                'price.required' => 'The price field is required.',
                'price.numeric' => 'The price field must be a numeric value.',

                'date_of_expiry.required' => 'The expiration date field is required.',
                'date_of_expiry.date_format' => 'The expiration date format is invalid.',

                'available_inventory.required' => 'The available inventory field is required.',
                'available_inventory.integer' => 'The available inventory field must be an integer.',

                'image',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()->first()
                ], 400);
            }

            $product = Inventory::find($id);

            $product->product_name = $request->input('product_name');
            $product->unit = $request->input('unit');
            $product->price = $request->input('price');
            $product->date_of_expiry = $request->input('date_of_expiry');
            $product->available_inventory = $request->input('available_inventory');
            $imagePath = $request->file('image')->storeAs('images', 'product_' . time() . '.' . $request->file('image')->getClientOriginalExtension(), 'public');

            $product->image = $imagePath;

            $product->save();

            return response()->json([
                'message' => 'Product updated successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteProduct(Request $request)
    {
        try {
            $this->validate($request, [
                'id' => 'required|integer',
            ]);

            $product = Inventory::find($request->id);

            if (!$product) {
                return response()->json([
                    'error' => 'Product not found'
                ], 404);
            }

            $product->delete();

            return response()->json([
                'message' => 'Product deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
