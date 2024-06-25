<?php

namespace App\Http\Controllers;


use Inertia\Inertia;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Panel\Registration\PositionRequest;

class PositionController extends Controller
{
    public function index()
    {
        return Inertia::render('Registration/Positions/Edit', [
            'positions' => Position::all()
        ]);
    }

    public function store(PositionRequest $request)
    {

        try {
            DB::transaction(function () use ($request) {
                $data = $request->validated();

                Position::create($data);
            });
        } catch (\Throwable $e) {
            dd($e);

            return redirect()
                ->back()
                ->with('error', $e->getMessage());
        }
    }
}