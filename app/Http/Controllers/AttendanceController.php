<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public static function isTodayAttendanceSubmitted(): bool
    {
        return Attendance::where('user_id', Auth::user()->id)
            ->whereDate('created_at', now()->toDateString())
            ->exists();
    }

    public function index()
    {
        $attendances = Attendance::OrderBy('created_at', 'DESC')->with('users')->paginate(7);
        return Inertia::render('Attendance/index', [
            'attendances' => $attendances,
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'status' => 'required',
            'description' => 'required_if:status,sick,leave,permit,business_trip,remote|max:500',
            'latitude' => 'required',
            'longitude' => 'required',
            'address' => 'nullable',
        ]);

        Attendance::create([
            'user_id' => Auth::user()->id,
            'status' => $request->status,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' => $request->address,
        ]);
    }

     public function destroy(Attendance $attendance)
     {
        $attendance->delete();
     }
}
