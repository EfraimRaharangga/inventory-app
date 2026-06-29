import React, { useState } from 'react';
import Input from './Input';
import { Search } from 'lucide-react';

export default function DataTable({ columns = [], data = [], onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        if (onSearch) {
            onSearch(val);
        }
    };

    return (
        <div className="w-full flex flex-col space-y-4">
            <div className="flex justify-between items-center bg-neutral-900 border border-neutral-800 p-2">
                <div className="flex items-center space-x-2 text-neutral-400 px-2">
                    <Search size={16} />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider">Search</span>
                </div>
                <Input
                    type="text"
                    placeholder="Enter query..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-64 max-w-full text-sm border-neutral-700 bg-neutral-950"
                />
            </div>

            <div className="overflow-x-auto border border-neutral-800 bg-neutral-900">
                <table className="w-full text-left font-mono text-sm">
                    <thead className="bg-neutral-950 border-b border-neutral-800 text-cyan-400">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className="px-4 py-3 font-semibold tracking-wider uppercase whitespace-nowrap">
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-neutral-800/50 transition-colors">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="px-4 py-3 text-neutral-300">
                                            {col.cell ? col.cell(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-8 text-center text-neutral-500">
                                    NO_DATA_FOUND
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Dummy Pagination */}
            <div className="flex items-center justify-between border border-neutral-800 bg-neutral-900 px-4 py-2 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                <div>Showing 1 to {data.length} of {data.length} entries</div>
                <div className="flex space-x-2 text-cyan-400">
                    <button className="px-2 py-1 border border-neutral-800 hover:bg-neutral-800 hover:text-cyan-300 transition-colors disabled:opacity-50" disabled>{"< Prev"}</button>
                    <button className="px-2 py-1 border border-neutral-800 hover:bg-neutral-800 hover:text-cyan-300 transition-colors disabled:opacity-50" disabled>{"Next >"}</button>
                </div>
            </div>
        </div>
    );
}
