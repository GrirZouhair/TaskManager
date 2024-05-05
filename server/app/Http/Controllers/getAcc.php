<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class getAcc extends Controller
{
    public function checkEmail($email)
    {
        $employee = Employee::where('email', $email)->first();
        if ($employee) {
            return response()->json(['success' => true, 'employee' => $employee]);
        } else {
            return response()->json(['success' => false, 'message' => 'Email not found'], 404);
        }
    }
}
