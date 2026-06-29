import React, { forwardRef, useEffect, useRef } from 'react';

const Input = forwardRef(function Input(
    { type = 'text', className = '', isFocused = false, hasError = false, ...props },
    ref
) {
    const inputRef = useRef();

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={`font-mono bg-neutral-900 border ${
                hasError ? 'border-rose-500 text-rose-400 focus:ring-rose-500' : 'border-neutral-700 text-neutral-200 focus:border-cyan-400 focus:ring-cyan-400'
            } focus:outline-none focus:ring-1 shadow-sm placeholder-neutral-600 px-3 py-2 ${className}`}
            ref={ref ? ref : inputRef}
        />
    );
});

export default Input;
