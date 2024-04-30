<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function index()
    {
        return response()->json([
            'users' => User::all()
        ]);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'required|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $validatedData = $validator->validated();
        $validatedData['password'] = bcrypt($validatedData['password']);

        try {
            $user = User::create($validatedData);
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Account created successfully',
                'token' => $token,
                'status' => 200,
                'user' => $user
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'message' => 'Database error: ' . $e->getMessage(),
                'status' => 500
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong, please try again',
                'status' => 500
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['email', Rule::unique('users', 'email')->ignore($id)],
            'password' => 'sometimes|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $user = User::findOrFail($id);

            // Update email if provided and not empty
            if ($request->has('email') && !empty($request->email)) {
                $user->email = $request->email;
            }

            // Update password if provided and not empty
            if ($request->has('password') && !empty($request->password)) {
                $user->password = bcrypt($request->password);
            }

            $user->save();

            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'User not found',
                'status' => 404
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong, please try again',
                'status' => 500
            ]);
        }
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Logged in successfully',
            'token' => $token,
            'user' => $user,
            'status' => 200
        ]);
    }



    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response([
            'message' => 'Logged out successfully',
            'status' => 200
        ]);
    }
}
