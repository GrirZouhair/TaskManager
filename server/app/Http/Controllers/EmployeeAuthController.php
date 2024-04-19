<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmployeeAuthController extends Controller
{
    public function AllEmployees()
    {
        $employees = Employee::all();
        if (sizeof($employees) == 0) {
            return response()->json([
                'Messages' => 'pas des Employees '
            ], 404);
        }
        return response()->json(['employee' => $employees], 200);
    }
    public function OneEmployees($id)
    {
        $employee = Employee::find($id);
        if ($employee == null) {
            return response()->json([
                'Messages' => 'Employee pas trouvée'
            ], 404);
        }
        return response()->json(['employee' => $employee], 200);
    }

    public function update(Request $request, $id)
    {
        $requestData = $request->all();

        $validator = Validator::make($requestData, [
            'full_name' => ['required', 'unique:employees,full_name,' . $id, 'min:3'],
            'email' => ['required', 'email', 'unique:employees,email,' . $id],
            'password' => 'sometimes|required|min:6',
            'gender' => 'required|in:male,female,other',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $update = Employee::find($id);

        if (!$update) {
            return response()->json([
                'Messages' => 'Employee not found'
            ], 404);
        }

        $update->full_name = $requestData['full_name'];
        $update->email = $requestData['email'];
        $update->password = $requestData['password'] ? Hash::make($requestData['password']) : $update->password;
        $update->gender = $requestData['gender'];

        $update->save();

        return response()->json(['Message' => 'updated successfully'], 200);
    }
    public function delete($id)
    {
        $employee = Employee::find($id);
        if ($employee == null) {
            return response()->json([
                'Messages' => 'Employee pas trouvée'
            ], 404);
        }
        $employee->delete();
        return response()->json(['Message' => 'deleted successfully'], 200);
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
        $request->user()->token()->revoke();

        return response([
            'message' => 'Logged out sucesfully'
        ]);
    }
}
