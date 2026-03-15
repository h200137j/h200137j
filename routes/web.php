<?php

use App\Http\Controllers\ContactController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Portfolio');
})->name('home');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard',              [ContactController::class, 'index'])->name('dashboard');
    Route::delete('/messages/{message}',  [ContactController::class, 'destroy'])->name('messages.destroy');
});

require __DIR__.'/auth.php';
