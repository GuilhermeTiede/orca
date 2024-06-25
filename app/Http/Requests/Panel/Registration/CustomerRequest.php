<?php

namespace App\Http\Requests\Panel\Registration;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        $rules = [
            'first_name' => 'required|string|max:255',
            'social_name' => 'nullable|string|max:255',
            'nationality' => 'nullable|string|max:255',
            'email' => 'required|email|unique:customers',
            'phone' => 'nullable|string|max:20',
            'gender' => 'nullable|in:Male,Female',
            'document_type' => 'nullable|in:CPF,ID,Passport,Other',
            'document_number' => 'nullable|string|max:50',
            'birthdate' => 'nullable|date',
            'customer_type' => 'nullable|in:Individual,Corporate',
            'account_type' => 'nullable|in:Customer,Affiliate,Agency,Influencer',
            'notes' => 'nullable|string',

            'address' => 'required|array',
            'address.country' => 'nullable|string|max:255',
            'address.city' => 'nullable|string|max:255',
            'address.street' => 'nullable|string|max:255',
        ];

        return $rules;
    }


}