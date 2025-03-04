<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriasSeeder extends Seeder
{
    public function run()
    {
        $categorias = [
            ['nombre' => 'Acción'],
            ['nombre' => 'Comedia'],
            ['nombre' => 'Drama'],
            ['nombre' => 'Terror'],
            ['nombre' => 'Ciencia Ficción'],
            ['nombre' => 'Romance'],
            ['nombre' => 'Documental'],
        ];

        DB::table('categorias')->insert($categorias);
    }
}