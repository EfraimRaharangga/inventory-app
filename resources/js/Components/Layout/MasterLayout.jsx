import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, RefreshCcw, Users, Menu, X, Terminal, ChevronLeft, ChevronRight, Keyboard, Search, UserCircle, Bell } from 'lucide-react';
import CommandPaletteMock from '@/Components/UI/CommandPaletteMock';

export default function MasterLayout({ children, title }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [showPalette, setShowPalette] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setShowPalette(true);
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                setCollapsed(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const navGroups = [
        {
            group: 'System Tools',
            items: [
                { name: 'Dashboard', href: '/', icon: LayoutDashboard },
                { name: 'Barang', href: '/barang', icon: Package },
                { name: 'Peminjaman', href: '/peminjaman', icon: RefreshCcw },
            ]
        },
        {
            group: 'Management',
            items: [
                { name: 'Users', href: '/user', icon: Users },
            ]
        },
        {
            group: 'Reference',
            items: [
                { name: 'Hotkeys', href: '/hotkeys', icon: Keyboard },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans flex flex-col md:flex-row">
            <CommandPaletteMock show={showPalette} onClose={() => setShowPalette(false)} />

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900 sticky top-0 z-30">
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
                        <div className={`p-6 border-b border-neutral-800 flex items-center ${collapsed ? 'justify-center' : 'space-x-3 justify-between'} text-cyan-400 transition-all h-16`}>
                            <div className="flex items-center space-x-3">
                                <Terminal size={28} className="shrink-0" />
                                {!collapsed && <span className="font-mono font-bold tracking-[0.2em] text-lg whitespace-nowrap">INV_SYS</span>}
                            </div>
                        </div>
                        
                        <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
                            {navGroups.map((group, gIdx) => (
                                <div key={gIdx} className="mb-6">
                                    <div className={`px-4 mb-2 font-mono text-[10px] text-neutral-600 uppercase tracking-widest ${collapsed ? 'text-center opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'} transition-all`}>
                                        {group.group}
                                    </div>
                                    <ul className="space-y-1 px-3">
                                        {group.items.map((item) => {
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
                                </div>
                            ))}
                        </nav>
                        
                        <div className="p-4 border-t border-neutral-800 flex flex-col space-y-4">
                            <div className={`font-mono text-[10px] text-neutral-600 uppercase tracking-widest flex ${collapsed ? 'justify-center' : 'justify-between'}`}>
                                {!collapsed && <span>Status</span>}
                                <span className="text-cyan-600" title="Online">{collapsed ? 'ON' : 'Online'}</span>
                            </div>
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

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Persistent Header */}
                <header className="h-16 hidden md:flex items-center justify-between px-8 bg-neutral-900 border-b border-neutral-800 sticky top-0 z-20 shrink-0">
                    <div className="flex items-center space-x-4">
                        <h2 className="font-mono text-lg font-bold text-cyan-400 tracking-widest uppercase truncate max-w-sm">
                            {title || 'Dashboard'}
                        </h2>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        <button 
                            onClick={() => setShowPalette(true)}
                            className="flex items-center space-x-3 bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-md text-neutral-500 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors w-64"
                        >
                            <Search size={16} />
                            <span className="font-mono text-xs flex-1 text-left">Search...</span>
                            <span className="font-mono text-[10px] border border-neutral-800 px-1 rounded bg-neutral-900">Ctrl K</span>
                        </button>
                        
                        <div className="flex items-center space-x-4 border-l border-neutral-800 pl-6">
                            <button className="text-neutral-500 hover:text-cyan-400 transition-colors relative">
                                <Bell size={18} />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center space-x-3 cursor-pointer group">
                                <div className="text-right hidden lg:block">
                                    <div className="font-mono text-xs text-neutral-300 font-bold group-hover:text-cyan-400 transition-colors">Admin_01</div>
                                    <div className="font-mono text-[10px] text-cyan-600 uppercase tracking-widest">Administrator</div>
                                </div>
                                <UserCircle size={28} className="text-neutral-400 group-hover:text-cyan-400 transition-colors" />
                            </div>
                        </div>
                    </div>
                </header>

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
        </div>
    );
}
