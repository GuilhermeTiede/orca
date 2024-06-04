<?php

namespace App\Http\Requests\Panel\Registration;

use Illuminate\Foundation\Http\FormRequest;

class AfiliatesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        $rules = [
            'name' => 'nullable',
            'comission' => 'nullable',
            'document_type' => 'nullable',
            'document' => 'nullable',
            'bank_data' => 'nullable',
            'afiliated_observation' => 'nullable',

            'address' => 'nullable|array', // Valida se é um array
            'address.country' => 'nullable|string|max:255', // Exemplo de validação
            'address.city' => 'nullable|string|max:255',
            'address.street' => 'nullable|string|max:255',
        ];

        return $rules;
    }


}