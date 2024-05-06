<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Employee;

class GetAccountController extends Controller
{
    public function checkEmail($email)
    {
        $employee = Employee::where('email', $email)->first();
        $user = User::where('email', $email)->first();
        $randomNumber = random_int(20000, 99999);

        if ($employee || $user) {
            if ($user) {
                $user['securecode'] = $randomNumber;
                $user->save();
            } else {
                $employee['securecode'] = $randomNumber;
                $employee->save();
            }
            return response()->json(['success' => true, 'employee' => $employee, 'user' => $user, 'secureCode' => $randomNumber]);
        } else {
            return response()->json(['success' => false, 'message' => 'Email not found'], 404);
        }
    }

    public function updatePassword(Request $request)
    {
        try {
            $employee = Employee::where('email', $request->email)->first();
            $user = User::where('email',  $request->email)->first();

            if ($user) {
                $user->password = Hash::make($request->input('password'));
                $user->save();
            } elseif ($employee) {
                $employee->password = Hash::make($request->input('password'));
                $employee->save();
            } else {
                return response()->json(['success' => false, 'message' => 'User not authenticated'], 401);
            }

            return response()->json(['success' => true, 'message' => 'Password updated successfully'], 200);
        } catch (\Exception $e) {
            // Log the exception for debugging
            return response()->json(['success' => false, 'message' => 'Failed to update password. Please try again later ' . $e->getMessage()], 500);
        }
    }
}
