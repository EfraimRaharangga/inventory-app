<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // ambil data user 
        $users = User::select("username", "name", "role", "isActive")->get();

        //kembalikan data ke view
        return inertia("User/index", [
            "users" => $users,
        ]);
    }

    public function store(Request $request)
    {
        // validasi input
        $request->validate([
            "username" => ['required', 'string', 'max:255','unique:users,username'],
            "name" => ['required', 'string', 'max:255'],
            "role" => ['required', 'in:admin,user,staff'],
            "password" => ['required', 'string', 'max:255'],
        ]);

        // simpan jika validasi berhasi
        User::create([
            "username" => $request->username,
            "name" => $request->name,
            "role" => $request->role,
            "password" => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', 'User'.$request->username.' berhasil ditambahkan');
    }

    public function destroy(User $user){
        // User tidak bisa menghapus dirinya sendiri
        // if ($user->username === $request->user()->username){
        //     return redirect()->back()->with('error', 'Anda tidak bisa menghapus diri sendiri');
        // }

        // Hapus User
        $user->delete();

        return redirect()->back()->with('success', 'User '.$user->username.' berhasil dihapus') ;
    }

    public function edit(User $user)
    {
        return inertia("User/edit", [
            "user" => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        // validasi update 
        $request->validate([
            "username" => ['required', 'string', 'max:255','unique:users,username'],
            "name" => ['required', 'string', 'max:255'],
            "role" => ['required', 'in:admin,user,staff'],
            "password" => ['required', 'string', 'max:255'],
        ]);

        // update user 
        $user->update([
            "username" => $request->username,
            "name" => $request->name,
            "role" => $request->role,
            "password" => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', 'Data user '.$user->username.' berhasil diupdate') ;
    }
}
