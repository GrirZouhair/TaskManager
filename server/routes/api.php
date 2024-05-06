<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\GetAccountController;
use App\Http\Controllers\EmployeeAuthController;


// Route for checking email and sending reset link
Route::get('/accounts/email/{email}', [GetAccountController::class, 'checkEmail']);

// Route for updating password
Route::put('/update-password', [GetAccountController::class, 'updatePassword']);




// Route for user login (POST method)
Route::post('/user/login', [UserController::class, 'login']);

// Route for creating a new user (POST method)
Route::post('/user/store', [UserController::class, 'store']);

// Route for employee login (POST method)
Route::post('/employee/login', [EmployeeAuthController::class, 'login']);


// Route::get('/employees/email/{email}', [EmployeeAuthController::class, 'checkEmail']);

// test email
Route::get('/email/{email}/{employee}/{task}/{deadLine}', [EmailController::class, 'send']);

Route::middleware(['auth:sanctum'])->group(function () {
    // upload task proof
    Route::put('/task/upload/{id}', [TaskController::class, 'uploadFile']);

    // Create (Store) Task
    Route::post('/tasks/store', [TaskController::class, 'store']);

    // Get All Tasks
    Route::get('/tasks/all/{user}', [TaskController::class, 'index']);

    // get OverDeadLine Tasks
    Route::get('/tasks/tasksStatictis/{user}', [TaskController::class, 'tasksStatictis']);

    // Get Task by id
    Route::get('/tasks/find/{id}', [TaskController::class, 'find']);

    // Read (Get) Task
    Route::get('/tasks/{idEmpolyee}', [TaskController::class, 'showTask']);

    // Update Task
    Route::put('/tasks/{id}', [TaskController::class, 'update']);

    // Delete Task
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);


    // get all employees
    Route::get('/employees/{user}', [EmployeeAuthController::class, 'AllEmployees']);

    // get one employees
    Route::get('/firstFiveEmployees/{user}', [EmployeeAuthController::class, 'firstFiveEmployees']);

    // get one employees
    Route::get('/employee/{id}', [EmployeeAuthController::class, 'OneEmployees']);

    Route::post('/employee/store', [EmployeeAuthController::class, 'store']);

    // update
    Route::put('/employee/update/{id}', [EmployeeAuthController::class, 'update']);

    Route::put('/user/update/{id}', [UserController::class, 'update']);

    // Route for user logout (POST method)
    Route::post('/user/logout', [UserController::class, 'logout']);

    // Route for employee logout (POST method)
    Route::post('/employee/logout', [EmployeeAuthController::class, 'logout']);


    // delete
    Route::delete('/user/delete/{id}', [UserController::class, 'delete']);
    Route::delete('/employee/delete/{id}', [EmployeeAuthController::class, 'delete']);
});
