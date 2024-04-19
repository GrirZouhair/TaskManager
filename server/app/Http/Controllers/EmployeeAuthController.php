<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeAuthController extends Controller
{
    use HasApiTokens, HasFactory, Notifiable;

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

        $validated = $request->validate(
            [
                'full_name' => 'required|unique:employees|min:3',
                'email' => 'required|email',
                'password' => 'required|min:6',
                'gender' => 'required|in:male,female,other',
            ],
            [
                'full_name.required' => 'Please input Employee Name',
                'full_name.unique' => 'The Employee Name has already been taken',
                'full_name.min' => 'Employee Name must be at least :min characters',
                'email.required' => 'Please input Employee Email',
                'email.email' => 'Please enter a valid Email address',
                'gender.required' => 'Please select Employee Gender',
                'gender.in' => 'Invalid gender selected',
                'password.required' => 'Please input Password',
                'password.min' => 'Password must be at least :min characters',
            ]
        );
        $update = Employee::find($id)->update([
            "full_name" => $request->full_name,
            "email" => $request->email,
            "password" => $request->password,
            "gender" => $request->gender,
        ]);

        if (!$update) {
            return response()->json([
                'Messages' => 'Il a une erreur en la mise a jour essayer'
            ], 404);
        }
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
        $formFields = $request->validate([
            'full_name' => 'required',
            'gender' => 'required',
            'email' => ['required', 'email', Rule::unique('employees', 'email')],
            'password' => 'required|confirmed',
        ]);

        $formFields['password'] = bcrypt($formFields['password']);
        $employee = Employee::create($formFields);
        if ($employee) {
            return response()->json(['message' => 'Account created successfully']);
        } else {
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
