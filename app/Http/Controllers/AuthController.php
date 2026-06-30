<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function renderLogin() {
        // show halaman login 
        return inertia('Auth/Login');
    }

    public function login(Request $request) {
        // validasi input
        $request->validate([
            "username" => ['required', 'string', 'max:255'],
            "password" => ['required', 'string', 'max:255'],
            "remember" => ['boolean','nullable'],
        ]);

        if(Auth::attempt($request->only('username','password'), $request->remember)){
            // redirect ke dashboard
            return redirect()->route('dashboard');
        }

        // jika gagal login 
        return back()->with('error', 'Username atau password salah');
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // redirect ke halaman login 
        return redirect()->route('login')->with('success','Logout berhasil');
    }
}
