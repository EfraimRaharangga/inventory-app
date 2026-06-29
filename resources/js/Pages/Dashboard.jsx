import React, { useState } from 'react';
import MasterLayout from '@/Components/Layout/MasterLayout';
import Card from '@/Components/UI/Card';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import FlashMessage from '@/Components/UI/FlashMessage';
import { Activity, AlertTriangle, CheckCircle, Database } from 'lucide-react';

export default function Dashboard({ stats, alerts, recentActivity }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [flashMsg, setFlashMsg] = useState('');

    const statCards = [
        { title: 'Total Barang', value: stats.total_barang, icon: Database, color: 'text-cyan-400' },
        { title: 'Peminjaman Aktif', value: stats.peminjaman_aktif, icon: Activity, color: 'text-emerald-400' },
        { title: 'User Aktif', value: stats.user_aktif, icon: CheckCircle, color: 'text-cyan-400' },
        { title: 'Sistem Status', value: stats.sistem_status, icon: AlertTriangle, color: stats.sistem_status === 'OPTIMAL' ? 'text-emerald-400' : 'text-amber-400' },
    ];

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'User', accessor: 'user' },
        { header: 'Action', cell: (row) => (
            <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border ${
                row.action === 'AUTH' ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10' :
                row.action === 'SYNC' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' :
                row.action === 'WRITE' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' :
                'border-neutral-500/50 text-neutral-400 bg-neutral-500/10'
            }`}>
                {row.action}
            </span>
        ) },
        { header: 'Time', accessor: 'time' },
    ];

    const handleSystemCheck = () => {
        setIsModalOpen(false);
        setFlashMsg('System check initiated. Syncing data...');
    };

    return (
        <MasterLayout>
            <FlashMessage message={flashMsg} onClose={() => setFlashMsg('')} />
            
            <div className="mb-8 flex justify-between items-end border-b border-neutral-800 pb-4">
                <div>
                    <h1 className="font-mono text-2xl font-bold text-cyan-400 tracking-widest uppercase">
                        Dashboard
                    </h1>
                    <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-1">
                        System Overview & Diagnostics
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    Run Diagnostics
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={idx} className="relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Icon size={64} className={stat.color} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-2">
                                    {stat.title}
                                </h3>
                                <div className={`font-mono text-3xl font-bold ${stat.color}`}>
                                    {stat.value}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Recent Activity" className="lg:col-span-2">
                    <DataTable columns={columns} data={recentActivity} />
                </Card>

                <div className="space-y-6">
                    <Card title="System Alerts">
                        <div className="space-y-3">
                            {alerts.map(alert => (
                                <div key={alert.id} className={`p-3 border font-mono text-xs tracking-wider ${
                                    alert.type === 'error' ? 'border-rose-500/30 bg-rose-950/20 text-rose-400' : 'border-amber-500/30 bg-amber-950/20 text-amber-400'
                                }`}>
                                    <div className="font-bold mb-1 uppercase">[{alert.type}]</div>
                                    <div>{alert.message}</div>
                                </div>
                            ))}
                            {alerts.length === 0 && (
                                <div className="text-neutral-500 font-mono text-xs text-center py-4">NO ALERTS</div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="System Diagnostics">
                <div className="space-y-4">
                    <p className="font-mono text-sm text-neutral-300">
                        Initiating full system diagnostic scan. This action will check database integrity, sync logs, and verify active sessions.
                    </p>
                    <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-800">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSystemCheck}>
                            Confirm Scan
                        </Button>
                    </div>
                </div>
            </Modal>
        </MasterLayout>
    );
}
