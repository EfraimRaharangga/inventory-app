<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeviceSeeder extends Seeder
{
    public function run(): void
    {
        $perangkat = [
            'Cisco Catalyst 9300', 'MikroTik CCR1036', 'Nokia 7750 SR',
            'Juniper MX204', 'Arista 7050S', 'Fortigate 60F',
            'Ubiquiti EdgeRouter', 'HP Aruba 2930', 'Extreme Networks VSP',
            'Cisco Nexus 9000'
        ];

        foreach ($perangkat as $nama) {
            DB::table('devices')->insert([
                'nama' => $nama,
                'status' => 'Up', // Default semua 'Up' dulu
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}