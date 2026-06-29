import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, RefreshCcw, Users, Menu, X, Terminal, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MasterLayout({ children }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Barang', href: '/barang', icon: Package },
        { name: 'Peminjaman', href: '/peminjaman', icon: RefreshCcw },
        { name: 'User', href: '/user', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900">
                <div className="flex items-center space-x-2 text-cyan-400">
                    <Terminal size={24} />
                    <span className="font-mono font-bold tracking-widest">INV_SYS</span>
                </div>
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-neutral-400 hover:text-cyan-400 transition-colors"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                {(sidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0, width: collapsed ? '5rem' : '16rem' }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className={`fixed inset-y-0 left-0 z-40 bg-neutral-900 border-r border-neutral-800 flex flex-col md:sticky md:top-0 md:h-screen md:translate-x-0 ${sidebarOpen ? 'block w-64' : 'hidden md:flex'}`}
                    >
                        <div className={`p-6 border-b border-neutral-800 flex items-center ${collapsed ? 'justify-center' : 'space-x-3 justify-between'} text-cyan-400 transition-all`}>
                            <div className="flex items-center space-x-3">
                                <Terminal size={28} className="shrink-0" />
                                {!collapsed && <span className="font-mono font-bold tracking-[0.2em] text-lg whitespace-nowrap">INV_SYS</span>}
                            </div>
                        </div>
                        
                        <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
                            <ul className="space-y-1 px-3">
                                {navItems.map((item) => {
                                    const isActive = url === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                title={collapsed ? item.name : undefined}
                                                className={`flex items-center ${collapsed ? 'justify-center px-0' : 'space-x-3 px-4'} py-3 font-mono text-sm uppercase tracking-wider transition-colors ${
                                                    isActive 
                                                        ? `bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400` 
                                                        : `text-neutral-400 border-l-2 border-transparent hover:bg-neutral-800 hover:text-neutral-200`
                                                }`}
                                            >
                                                <Icon size={18} className={`shrink-0 ${isActive ? 'text-cyan-400' : 'text-neutral-500'}`} />
                                                {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        
                        <div className="p-4 border-t border-neutral-800 flex flex-col space-y-4">
                            <div className={`font-mono text-[10px] text-neutral-600 uppercase tracking-widest flex ${collapsed ? 'justify-center' : 'justify-between'}`}>
                                {!collapsed && <span>Status</span>}
                                <span className="text-cyan-600" title="Online">{collapsed ? 'ON' : 'Online'}</span>
                            </div>
                            {/* Toggle Button for Desktop */}
                            <button 
                                onClick={() => setCollapsed(!collapsed)}
                                className="hidden md:flex items-center justify-center w-full py-2 bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors rounded-sm"
                            >
                                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-neutral-950/80 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-950 p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-7xl mx-auto"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
