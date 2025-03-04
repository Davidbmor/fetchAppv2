<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeliculasSeeder extends Seeder
{
    public function run()
    {
        $peliculas = [
            [
                'titulo' => 'Película de Acción',
                'descripcion' => 'Descripción de la película de acción.',
                'director' => 'Director de Acción',
                'fecha_estreno' => '2025-01-01',
                'ruta_imagen' => 'ruta/imagen/accion.jpg',
                'categoria_id' => 1, // Acción
            ],
            [
                'titulo' => 'Película de Comedia',
                'descripcion' => 'Descripción de la película de comedia.',
                'director' => 'Director de Comedia',
                'fecha_estreno' => '2025-02-01',
                'ruta_imagen' => 'ruta/imagen/comedia.jpg',
                'categoria_id' => 2, // Comedia
            ],
            [
                'titulo' => 'Película de Drama',
                'descripcion' => 'Descripción de la película de drama.',
                'director' => 'Director de Drama',
                'fecha_estreno' => '2025-03-01',
                'ruta_imagen' => 'ruta/imagen/drama.jpg',
                'categoria_id' => 3, // Drama
            ],
            [
                'titulo' => 'Película de Terror',
                'descripcion' => 'Descripción de la película de terror.',
                'director' => 'Director de Terror',
                'fecha_estreno' => '2025-04-01',
                'ruta_imagen' => 'ruta/imagen/terror.jpg',
                'categoria_id' => 4, // Terror
            ],
            [
                'titulo' => 'Película de Ciencia Ficción',
                'descripcion' => 'Descripción de la película de ciencia ficción.',
                'director' => 'Director de Ciencia Ficción',
                'fecha_estreno' => '2025-05-01',
                'ruta_imagen' => 'ruta/imagen/ciencia_ficcion.jpg',
                'categoria_id' => 5, // Ciencia Ficción
            ],
            [
                'titulo' => 'Película de Romance',
                'descripcion' => 'Descripción de la película de romance.',
                'director' => 'Director de Romance',
                'fecha_estreno' => '2025-06-01',
                'ruta_imagen' => 'ruta/imagen/romance.jpg',
                'categoria_id' => 6, // Romance
            ],
            [
                'titulo' => 'Película Documental',
                'descripcion' => 'Descripción de la película documental.',
                'director' => 'Director de Documental',
                'fecha_estreno' => '2025-07-01',
                'ruta_imagen' => 'ruta/imagen/documental.jpg',
                'categoria_id' => 7, // Documental
            ],
        ];

        DB::table('peliculas')->insert($peliculas);
    }
}