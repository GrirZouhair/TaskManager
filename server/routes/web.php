<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\EnsureTokenIsValid;

Route::get('/', function () {
    return view('welcome');
});
Route::get("/employee/all", [EmployeeController::class, "AllEmployees"])->name('all.employees');
Route::post('employee/store', [EmployeeController::class, "AddEmployee"])->name('store.employee');
Route::get('/employee/edit/{id}', [EmployeeController::class, "Edit"]);
Route::post('/employee/update/{id}', [EmployeeController::class, 'update'])->name('employee.update');
Route::get('/employee/delete/{id}', [EmployeeController::class, "delete"]);


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');
