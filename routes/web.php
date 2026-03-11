<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookmarkController;
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
        $bookIds = auth()->user()->bookmarks()->pluck('book_id');
        return Inertia::render('bookmarks', [
            'bookIds' => $bookIds
        ]);
    })->name('bookmarks');

    Route::get('/detail/{id}', function ($id) {
        $isBookmarked = auth()->user()->bookmarks()->where('book_id', $id)->exists();
        return Inertia::render('detail', [
            'id' => $id,
            'isBookmarked' => $isBookmarked
        ]);
    })->name('detail');

    Route::post('/bookmarks/toggle', [BookmarkController::class, 'toggle'])->name('bookmarks.toggle');

    // Route untuk nembak fungsi logout
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    Route::get('/api/books/search', [BookController::class, 'search'])->name('books.search');
    Route::get('/api/books/{id}', [BookController::class, 'show'])->name('books.show');
});

