import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight } from 'lucide-react';
import Input from './Input';

export default function CommandPaletteMock({ show = false, onClose }) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (show) {
            setQuery('');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <div 
                    className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
                    onKeyDown={handleKeyDown}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-700 shadow-2xl overflow-hidden rounded-md flex flex-col"
                    >
                        <div className="flex items-center p-4 border-b border-neutral-800">
                            <Search className="text-neutral-500 mr-3" size={20} />
                            <input
                                autoFocus
                                type="text"
                                className="w-full bg-transparent border-none text-neutral-200 font-mono text-sm placeholder-neutral-600 focus:outline-none focus:ring-0"
                                placeholder="Search commands, users, items... (MOCK)"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex items-center space-x-1 text-neutral-500 bg-neutral-950 px-2 py-1 rounded text-[10px] font-mono border border-neutral-800">
                                <span>ESC</span>
                            </div>
                        </div>

                        <div className="max-h-64 overflow-y-auto p-2">
                            {query ? (
                                <div className="p-4 text-center text-neutral-500 font-mono text-xs uppercase tracking-widest">
                                    No real results. This is a mock.
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <div className="px-3 py-2 text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-widest">Recent Searches</div>
                                    {['System Diagnostic', 'User: admin_01', 'Barang: K-12'].map((item, idx) => (
                                        <button 
                                            key={idx} 
                                            className="w-full flex items-center justify-between px-3 py-3 hover:bg-neutral-800 transition-colors rounded text-left group"
                                            onClick={onClose}
                                        >
                                            <span className="font-mono text-sm text-neutral-300 group-hover:text-cyan-400 transition-colors">{item}</span>
                                            <ArrowRight size={14} className="text-neutral-600 group-hover:text-cyan-400 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
