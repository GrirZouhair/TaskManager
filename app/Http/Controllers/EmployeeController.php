<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Auth;

class EmployeeController extends Controller
{

    public function AllEmployees()
    {
        $employees = Employee::latest()->paginate(5);
        return view('admin.employee.index', compact("employees"));
    }


    public function AddEmployee(Request $request)
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




        Employee::insert([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => $request->password,
            'gender' => $request->gender,
            'created_at' => Carbon::now()
        ]);

        return Redirect()->back()->with("success", "Employee Inseted Successfully");
    }


    public function Edit($id)
    {
        $employer = Employee::find($id);
        return view('admin.employee.edit', compact('employer'));
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

        return redirect()->route('all.employees')->with('success', 'Employee updated successfully.');
    }
    public function delete($id)
    {
        Employee::find($id)->delete();
        return Redirect()->back()->with("success", "Brand Delete Successfully");
    }
}
