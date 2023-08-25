<?php

use App\Http\Controllers\InventoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [InventoryController::class, 'getProduct']);
Route::post('/create/products', [InventoryController::class, 'createProduct']);
Route::put('/update/products', [InventoryController::class, 'updateProduct']);
Route::delete('/delete/products', [InventoryController::class, 'deleteProduct']);

