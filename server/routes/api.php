<?php

use App\Http\Controllers\EmployeeAuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;


// Route for user login (POST method)
Route::post('/user/login', [UserController::class, 'login']);

// Route for employee login (POST method)
Route::post('/employee/login', [EmployeeAuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {


    // Create (Store) Task
    Route::post('/tasks', [TaskController::class, 'store']);

    // Read (Get) Task
    Route::get('/tasks/{id}', [TaskController::class, 'show']);

    // Update Task
    Route::put('/tasks/{id}', [TaskController::class, 'update']);

    // Delete Task
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);


    // get all employees
    Route::get('/employees', [EmployeeAuthController::class, 'AllEmployees']);
    // get one employees
    Route::get('/employee/{id}', [EmployeeAuthController::class, 'OneEmployees']);

    // Route for creating a new user (POST method)
    Route::post('/user/store', [UserController::class, 'store']);
    Route::post('/employee/store', [EmployeeAuthController::class, 'store']);

    // update
    Route::put('/employee/update/{id}', [EmployeeAuthController::class, 'update']);
    Route::put('/user/update/{id}', [EmployeeAuthController::class, 'update']);

    // Route for user logout (POST method)
    Route::post('/user/logout', [UserController::class, 'logout']);

    // Route for employee logout (POST method)
    Route::post('/employee/logout', [UserController::class, 'logout']);


    // delete
    Route::delete('/user/delete/{id}', [EmployeeAuthController::class, 'delete']);
    Route::delete('/employee/delete/{id}', [EmployeeAuthController::class, 'delete']);
});
