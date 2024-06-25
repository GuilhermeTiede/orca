<?php

namespace App\Http\Controllers;

use App\Http\Requests\Panel\Registration\AfiliatesRequest;
use App\Models\Affiliate;
use App\Resources\Laratables\Registration\Affiliate as LaratablesAffiliate;
use Freshbitsweb\Laratables\Laratables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AffiliateController extends Controller
{
    public function index()
    {
        if (request()->expectsJson()) {
            return Laratables::recordsOf(Affiliate::class, LaratablesAffiliate::class);
        }
        return Inertia::render('Registration/Affiliates/List', [
            'affiliates' => Affiliate::all()
        ]);
    }

    public function show(Affiliate $affiliate)
    {
        return $affiliate;
    }

    public function store(AfiliatesRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $request->validated();

                $data['address'] = json_encode($data['address']);

                Affiliate::create($data);
            });
        } catch (\Throwable $e) {
            dd($e);

            return redirect()
                ->back()
                ->with('error', $e->getMessage());
        }
    }

    public function create()
    {
        return Inertia::render('Registration/Affiliates/Edit', [
            'affiliate' => new Affiliate(),
            'isReadOnly' => false,
        ]);
    }

    public function update(Request $request, Affiliate $affiliate)
    {
        $validatedData = $request->validate([ // Mesmas validações do store
            'name' => 'required|string|max:255',
            'comission' => 'required|numeric',
            'document' => 'nullable|string|max:255',
            'bank_data' => 'nullable|string',
            'afiliated_observation' => 'nullable|string',
        ]);

        $affiliate->update($validatedData);

        return $affiliate; // Retorna o afiliado atualizado
    }

    public function destroy(Affiliate $affiliate)
    {
        $affiliate->delete();

        return response()->noContent(); // Resposta padrão para exclusão
    }
}
