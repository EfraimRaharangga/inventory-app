import React from 'react';

export default function Card({ children, className = '', title, ...props }) {
    return (
        <div
            className={`bg-neutral-900 border border-neutral-800 p-4 ${className}`}
            {...props}
        >
            {title && (
                <div className="mb-4 pb-2 border-b border-neutral-800">
                    <h3 className="font-mono text-cyan-400 text-sm font-semibold tracking-wider uppercase">
                        {title}
                    </h3>
                </div>
            )}
            <div>{children}</div>
        </div>
    );
}
