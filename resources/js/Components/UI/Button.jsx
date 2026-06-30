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
    const baseClasses = `inline-flex items-center px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 ${processing ? 'opacity-50 cursor-not-allowed' : ''
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
            {processing ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center space-x-2"
                >
                    <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                </motion.div>
            ) : (
                children
            )}
        </motion.button>
    );
}
