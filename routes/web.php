<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'renderLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    // Halaman dashbord
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Route logout
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Dummy routes to demonstrate routing in the Master Layout
    Route::get('/barang', function () {
        return Inertia::render('DummyPage', ['title' => 'Manajemen Barang']);
    })->name('barang.index');
    
    Route::get('/peminjaman', function () {
        return Inertia::render('DummyPage', ['title' => 'Peminjaman Aktif']);
    })->name('peminjaman.index');
    
    Route::get('/user', function () {
        return Inertia::render('UserManagement', ['title' => 'User Management']);
    })->name('user.index');
    
    Route::get('/hotkeys', function () {
        return Inertia::render('Hotkeys', ['title' => 'Hotkeys Reference']);
    })->name('hotkeys.index');
    
});

Route::get('/', function () {
    return redirect()->route('dashboard');
});
