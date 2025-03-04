<?php
namespace App\Http\Controllers;

use App\Models\Pelicula;
use App\Models\Categoria;
use Illuminate\Http\Request;

class PeliculaController extends Controller
{
    public function index()
    {
        if (request()->is('api/peliculas')) {
            $query = Pelicula::with('categoria');
            if ($categoriaId = request()->query('categoria_id')) {
                $query->where('categoria_id', $categoriaId);
            }
            $peliculas = $query->get();
            return response()->json($peliculas);
        }
        $peliculas = Pelicula::with('categoria')->get();
        $categorias = Categoria::all();
        return view('index', compact('peliculas', 'categorias'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'director' => 'required|string|max:255',
            'fecha_estreno' => 'required|date',
            'categoria_id' => 'required|integer',
        ]);

        // Establecer una imagen predeterminada
        $validatedData['ruta_imagen'] = 'imagenes/default.jpg';

        Pelicula::create($validatedData);

        return response()->json(['success' => true]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'director' => 'required|string|max:255',
            'fecha_estreno' => 'required|date',
            'categoria_id' => 'required|integer',
        ]);

        $pelicula = Pelicula::findOrFail($id);

        // Mantener la imagen existente si no se proporciona una nueva
        if (!$request->hasFile('ruta_imagen')) {
            $validatedData['ruta_imagen'] = $pelicula->ruta_imagen;
        }

        $pelicula->update($validatedData);

        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        $pelicula = Pelicula::findOrFail($id);
        $pelicula->delete();

        return response()->json(['success' => true]);
    }
}