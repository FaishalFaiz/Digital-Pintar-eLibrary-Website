<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store']);
    Route::get('/register', function () {
        return Inertia::render('auth/register');
    })->name('register');
    Route::post('/register', [AuthController::class, 'registerStore']);
});

// Khusus yang UDAH LOGIN (Protected Routes) 🔒
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/bookmarks', function () {
        return Inertia::render('bookmarks');
    })->name('bookmarks');

    Route::get('/detail/{id}', function ($id) {
        return Inertia::render('detail', ['id' => $id]);
    })->name('detail');

    // Route untuk nembak fungsi logout
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    Route::get('/api/books/search', [BookController::class, 'search'])->name('books.search');
    Route::get('/api/books/{id}', [BookController::class, 'show'])->name('books.show');
});

