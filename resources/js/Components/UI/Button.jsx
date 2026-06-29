import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
    type = 'button',
    className = '',
    processing = false,
    children,
    variant = 'primary',
    ...props
}) {
    const baseClasses = `inline-flex items-center px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 ${
        processing ? 'opacity-50 cursor-not-allowed' : ''
    }`;

    const variants = {
        primary:
            'bg-cyan-500/10 text-cyan-400 border-cyan-500/50 hover:bg-cyan-400 hover:text-neutral-950 focus:ring-cyan-400',
        secondary:
            'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 focus:ring-neutral-500',
        danger:
            'bg-rose-500/10 text-rose-500 border-rose-500/50 hover:bg-rose-500 hover:text-neutral-950 focus:ring-rose-500',
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            type={type}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            disabled={processing}
            {...props}
        >
            {processing && (
                <span className="mr-2 animate-pulse text-current">{"[..]"}</span>
            )}
            {children}
        </motion.button>
    );
}
