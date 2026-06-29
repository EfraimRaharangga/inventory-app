<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Dummy data for testing the UI
        $stats = [
            'total_barang' => 12450,
            'peminjaman_aktif' => 142,
            'user_aktif' => 89,
            'sistem_status' => 'OPTIMAL',
        ];

        $alerts = [
            ['id' => 1, 'type' => 'warning', 'message' => 'Stok barang K-12 hampir habis.'],
            ['id' => 2, 'type' => 'error', 'message' => 'Gagal sinkronisasi ke server pusat.'],
        ];

        $recentActivity = [
            ['id' => 1, 'user' => 'admin_01', 'action' => 'AUTH', 'time' => '10:45:01'],
            ['id' => 2, 'user' => 'sys_bot', 'action' => 'SYNC', 'time' => '10:40:22'],
            ['id' => 3, 'user' => 'staff_jkt', 'action' => 'WRITE', 'time' => '10:35:10'],
            ['id' => 4, 'user' => 'admin_02', 'action' => 'READ', 'time' => '10:30:00'],
            ['id' => 5, 'user' => 'admin_01', 'action' => 'AUTH', 'time' => '10:15:00'],
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'alerts' => $alerts,
            'recentActivity' => $recentActivity,
        ]);
    }
}
