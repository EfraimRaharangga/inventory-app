import React from 'react';

export default function Label({ value, className = '', children, ...props }) {
    return (
        <label
            {...props}
            className={`block font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 ${className}`}
        >
            {value ? value : children}
        </label>
    );
}
