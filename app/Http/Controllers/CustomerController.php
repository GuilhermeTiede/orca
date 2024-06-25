<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Panel\Registration\CustomerRequest;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Registration/Customers/Edit', [
            'customers' => Customer::all()
        ]);
    }

    public function store(CustomerRequest $request)
    {
        $validatedData = $request->validated();

        $customer = Customer::create($validatedData);

        return $customer;
    }

    public function update(Request $request, Customer $customer)
    {

    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->noContent();
    }
}