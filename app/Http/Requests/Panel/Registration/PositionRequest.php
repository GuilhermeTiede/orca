<?php

namespace App\Http\Requests\Panel\Registration;

use Illuminate\Foundation\Http\FormRequest;

class PositionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        $rules = [
            'name' => 'required',
            'slug' => 'required',
            'description' => 'nullable',
            'access_level' => 'required',
        ];

        return $rules;
    }


}