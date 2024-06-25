<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\Tour\TourController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\OperatorTourController;
use App\Http\Controllers\ProfessionalController;
use App\Http\Controllers\Budget\BudgetController;
use App\Http\Controllers\Tour\TourPriceController;
use App\Http\Controllers\Budget\BudgetTourController;
use App\Http\Controllers\Schedule\ScheduleController;
use App\Http\Controllers\Budget\BudgetServiceController;
use App\Http\Controllers\Budget\BudgetPassengerController;
use App\Http\Controllers\Schedule\ScheduleReviewController;

// Rotas autenticadas
Route::middleware('auth')->group(function () {
    Route::get('/panel/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/budgets/{budget}/complete', [BudgetController::class, 'showCompleteBudget']);
    Route::get('/budgets/{budget}/calculate-final-price', [BudgetController::class, 'calculateFinalPrice']);

    Route::resource('affiliates', AffiliateController::class);
    Route::resource('positions', PositionController::class);
    Route::resource('customers', CustomerController::class);
});