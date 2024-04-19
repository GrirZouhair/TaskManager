<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserController extends Controller
{
    use HasApiTokens, HasFactory, Notifiable;

    public function index()
    {
        return response()->json([
            'users' => User::all()
        ]);
    }

    public function store(Request $request)
    {
        $formFields = $request->validate([
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'required|confirmed',
        ]);

        $pass = bcrypt($formFields['password']);
        $user = User::create([
            'email' => $request->email,
            'password' => $pass,
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        if ($user) {
            return response()->json(['message' => 'Account created successfully', 'token' => $token, 'status' => 201, 'user' => $user]);
        } else {
            return response()->json(['message' => 'Something went wrong, please try again', 'status' => 500]);
        }
    }

    public function login(REQUEST $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json(['message' => 'logged in successfully', 'token' => $token, 'status' => 200, 'user' => $user]);
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
