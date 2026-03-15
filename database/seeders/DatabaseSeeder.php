<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'calvin@ctm.dev'],
            [
                'name'     => 'Calvin Tafadzwa Mashamba',
                'password' => Hash::make('CTM@2026!'),
            ]
        );
    }
}
