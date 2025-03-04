<?php
use App\Http\Controllers\PeliculaController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PeliculaController::class, 'index']);
Route::get('/api/peliculas', [PeliculaController::class, 'index']);
Route::post('/api/peliculas', [PeliculaController::class, 'store']);
Route::post('/api/peliculas/{id}', [PeliculaController::class, 'update']);
Route::delete('/api/peliculas/{id}', [PeliculaController::class, 'destroy']);