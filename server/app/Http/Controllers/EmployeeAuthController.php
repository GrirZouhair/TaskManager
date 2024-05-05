<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmployeeAuthController extends Controller
{
    public function AllEmployees($user)
    {
        $employees = Employee::where('boss_id', $user)
            ->orderBy('points', 'desc')
            ->get();
        return response()->json(['employee' => $employees], 200);
    }

    public function firstFiveEmployees($user)
    {
        $employees = Employee::where('boss_id', $user)
            ->orderBy('points', 'desc')
            ->orderBy('created_at', 'asc')
            ->take(5) // Take the first five employees
            ->get();

        return response()->json(['employees' => $employees], 200);
    }

    public function OneEmployees($id)
    {
        $employee = Employee::find($id);
        if ($employee == null) {
            return response()->json([
                'message' => 'Employee pas trouvée'
            ], 404);
        }
        return response()->json(['employee' => $employee], 200);
    }

    public function update(Request $request, $id)
    {
        $requestData = $request->all();

        $validator = Validator::make($requestData, [
            'full_name' => ['min:3'],
            'email' => ['email', 'unique:employees,email,' . $id],
            'password' => 'min:3',
            'gender' => 'in:male,female,other',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $update = Employee::find($id);

        if (!$update) {
            return response()->json([
                'message' => 'Employee not found'
            ], 404);
        }
        if ($request->has('password')) {
            $update->password = Hash::make($requestData['password']);
        }
        if ($request->has('email')) {
            $update->email = $requestData['email'];
        }
        if ($request->has('full_name')) {
            $update->full_name = $requestData['full_name'];
        }
        if ($request->has('gender')) {
            $update->gender = $requestData['gender'];
        }

        $update->save();

        return response()->json(['message' => 'Employee updated successfully', 'update' => $update], 200);
    }
    public function delete($id)
    {
        $employee = Employee::find($id);
        if ($employee == null) {
            return response()->json([
                'message' => 'Employee pas trouvée'
            ], 404);
        }
        $employee->delete();
        return response()->json(['message' => 'deleted successfully'], 200);
    }
    public function store(Request $request)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                'full_name' => 'required',
                'gender' => 'required',
                'email' => ['required', 'email', Rule::unique('employees', 'email')],
                'password' => 'required|confirmed',
                'boss_id' => 'exists:users,id'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            // Get the validated data
            $validatedData = $validator->validated();

            // Hash the password
            $validatedData['password'] = bcrypt($validatedData['password']);

            // Create a new employee record
            $employee = Employee::create($validatedData);

            // Return success response if employee creation is successful
            return response()->json(['message' => 'Account created successfully']);
        } catch (\Illuminate\Database\QueryException $e) {
            // Return error response if a database query exception occurs
            return response()->json(['message' => 'Database error: ' . $e->getMessage(), 'status' => 500]);
        } catch (\Exception $e) {
            // Return error response if an exception occurs
            return response()->json(['message' => 'Something went wrong, please try again', 'status' => 500]);
        }
    }


    public function login(REQUEST $request)
    {
        $employee = Employee::where('email', $request->email)->first();
        if ($employee && Hash::check($request->password, $employee->password)) {
            $token = $employee->createToken('auth_token')->plainTextToken;
            return response()->json(['message' => 'logged in successfully', 'token' => $token, 'status' => 200, 'employee' => $employee]);
        }

        return response()->json(['message' => 'invalid cedintial', 'status' => 404]);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response([
            'message' => 'Logged out sucesfully',
            'status' => 200
        ]);
    }

    // public function checkEmail($email)
    // {
    //     $employee = Employee::where('email', $email)->first();

    //     if ($employee) {
    //         return response()->json(['success' => true, 'employee' => $employee]);
    //     } else {
    //         return response()->json(['success' => false, 'message' => 'Email not found'], 404);
    //     }
    // }
}
