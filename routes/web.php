<?php

use App\Http\Controllers\ContactController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Portfolio');
})->name('home');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
