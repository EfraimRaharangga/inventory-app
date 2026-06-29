import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ show = false, onClose, children, title }) {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
                        onClick={onClose}
                    />

                    {/* Modal Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700 shadow-2xl p-6 overflow-hidden"
                    >
                        {title && (
                            <div className="mb-4 pb-3 border-b border-neutral-800 flex justify-between items-center">
                                <h3 className="font-mono text-cyan-400 font-bold uppercase tracking-widest text-lg">
                                    {title}
                                </h3>
                                <button 
                                    onClick={onClose}
                                    className="text-neutral-500 hover:text-cyan-400 font-mono text-xl leading-none transition-colors"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                        <div className="mt-4">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
