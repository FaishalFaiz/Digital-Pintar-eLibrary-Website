<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('auth/register');
})->name('register');

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('/bookmarks', function () {
    return Inertia::render('bookmarks');
})->name('bookmarks');

Route::get('/detail/{id}', function ($id) {
    return Inertia::render('detail', ['id' => $id]);
})->name('detail');
