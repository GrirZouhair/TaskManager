<?php

use App\Http\Controllers\EmployeeAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


// Route for fetching all users (GET method)
Route::get('/users', [UserController::class, 'index']);

// Route for creating a new user (POST method)
Route::post('/store', [UserController::class, 'store'])
;
Route::post('/store/employee', [EmployeeAuthController::class, 'store']);

// Route for user login (POST method)
Route::post('/login', [UserController::class, 'login']);

// Route for user logout (POST method)
Route::post('/logout', [UserController::class, 'logout']);



Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
