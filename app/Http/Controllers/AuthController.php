<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Inertia\Inertia;

class AuthController extends Controller
{
    // 1. Nampilin halaman Login React kamu
    public function create()
    {
        return Inertia::render('auth/login');
    }

    // 2. Logic proses Login
    public function store(Request $request)
    {
        // Validasi inputan form
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Coba cocokin ke database. Auth::attempt nge-handle hash password otomatis!
        if (Auth::attempt($credentials)) {
            // Kalau tembus, perbarui ID session biar aman dari serangan "Session Fixation"
            $request->session()->regenerate();

            // Arahin ke halaman yang dia tuju sebelum login (atau default ke dashboard)
            return redirect()->intended('/dashboard');
        }

        // Kalau gagal, tendang balik ke form login bawa pesan error
        return back()->withErrors([
            'email' => 'Email atau password salah nih bro, coba lagi.',
        ])->onlyInput('email');
    }

    // 3. Logic Logout
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout(); // Cabut akses

        $request->session()->invalidate(); // Hancurkan session / "KTP" nya
        $request->session()->regenerateToken(); // Hancurkan token CSRF

        return redirect('/'); // Tendang ke landing page
    }
    // 4. Logic proses Register
    public function registerStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|min:3',
            'email' => 'required|string|email|max:100|min:3|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ], [
            'name.required' => 'Nama jangan dikosongin dong, masa anonim? 😂',
            'name.min' => 'Nama kependekan bro, minimal 3 karakter ya.',
            'name.max' => 'Waduh, namanya kepanjangan! Maksimal 50 karakter aja biar rapi.',
            'name.regex' => 'Nama pake huruf aja ya, jangan pake simbol aneh-aneh.',
            'email.unique' => 'Email ini udah dipake orang lain, cari yang lain gih!',
            'password.min' => 'Password minimal 8 karakter biar aman dari hacker! 🔒',
        ]);

        Auth::login($user);

        return redirect()->intended('/dashboard');
    }
}