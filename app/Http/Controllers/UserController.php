<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        $users = User::select('id', 'name', 'email', 'role')->paginate(7);

        return Inertia::render('User/index', [
            'users' => $users
        ]);
    }

    public function create() {
        return Inertia::render('User/create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        User::create($request->all());
    }

    public function edit(User $user) {
        return Inertia::render('User/edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user) {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6|confirmed',
        ]);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'role' => $request->role,
        ]);
    }

    public function destroy(User $user) {
        $user->delete();
    }
}
