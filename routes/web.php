<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// Dummy routes to demonstrate routing in the Master Layout
Route::get('/barang', function () {
    return Inertia::render('DummyPage', ['title' => 'Manajemen Barang']);
})->name('barang.index');

Route::get('/peminjaman', function () {
    return Inertia::render('DummyPage', ['title' => 'Peminjaman Aktif']);
})->name('peminjaman.index');

Route::get('/user', function () {
    return Inertia::render('DummyPage', ['title' => 'User Management']);
})->name('user.index');