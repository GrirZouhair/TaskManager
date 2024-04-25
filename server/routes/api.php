<?php

use App\Http\Controllers\EmployeeAuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;


// Route for user login (POST method)
Route::post('/user/login', [UserController::class, 'login']);

// Route for creating a new user (POST method)
Route::post('/user/store', [UserController::class, 'store']);

// Route for employee login (POST method)
Route::post('/employee/login', [EmployeeAuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {


    // Create (Store) Task
    Route::post('/tasks/store', [TaskController::class, 'store']);

    // Get All Tasks
    Route::get('/tasks/all', [TaskController::class, 'index']);

    // Get finished Tasks
    Route::get('/tasks/finished', [TaskController::class, 'finishedTask']);

    // Get unfinished Tasks
    Route::get('/tasks/unfinished', [TaskController::class, 'unFinishedTask']);

    // get OverDeadLine Tasks
    Route::get('/tasks/overDeadLine', [TaskController::class, 'OverDeadLine']);

    // Read (Get) Task
    Route::get('/tasks/{idEmpolyee}', [TaskController::class, 'showTask']);

    // Update Task
    Route::put('/tasks/{id}', [TaskController::class, 'update']);

    // Delete Task
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);


    // get all employees
    Route::get('/employees', [EmployeeAuthController::class, 'AllEmployees']);

    // get one employees
    Route::get('/firstFiveEmployees', [EmployeeAuthController::class, 'firstFiveEmployees']);

    // get one employees
    Route::get('/employee/{id}', [EmployeeAuthController::class, 'OneEmployees']);

    Route::post('/employee/store', [EmployeeAuthController::class, 'store']);

    // update
    Route::put('/employee/update/{id}', [EmployeeAuthController::class, 'update']);
    Route::put('/user/update/{id}', [UserController::class, 'update']);

    // Route for user logout (POST method)
    Route::post('/user/logout', [UserController::class, 'logout']);

    // Route for employee logout (POST method)
    Route::post('/employee/logout', [UserController::class, 'logout']);


    // delete
    Route::delete('/user/delete/{id}', [EmployeeAuthController::class, 'delete']);
    Route::delete('/employee/delete/{id}', [EmployeeAuthController::class, 'delete']);
});
