import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlashMessage({ message, type = 'success', onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => {
                    if(onClose) onClose();
                }, 300); // Wait for exit animation
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    const typeClasses = {
        success: 'border-cyan-500 text-cyan-400 bg-cyan-950/50',
        error: 'border-rose-500 text-rose-400 bg-rose-950/50',
        warning: 'border-amber-500 text-amber-400 bg-amber-950/50',
    };

    return (
        <AnimatePresence>
            {isVisible && message && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -20, x: '-50%' }}
                    className={`fixed top-6 left-1/2 z-50 px-4 py-2 border font-mono text-sm tracking-wide shadow-lg flex items-center gap-3 backdrop-blur-sm ${typeClasses[type]}`}
                >
                    <span className="font-bold">[{type.toUpperCase()}]</span>
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
