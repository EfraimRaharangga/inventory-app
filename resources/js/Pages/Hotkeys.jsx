import React, { useState } from 'react';
import MasterLayout from '@/Components/Layout/MasterLayout';
import Card from '@/Components/UI/Card';
import Input from '@/Components/UI/Input';
import { Search, Keyboard } from 'lucide-react';

export default function Hotkeys({ title }) {
    const [searchTerm, setSearchTerm] = useState('');

    const shortcutCategories = [
        {
            category: 'Global',
            shortcuts: [
                { keys: ['Ctrl', 'K'], description: 'Open Command Palette' },
                { keys: ['Ctrl', 'B'], description: 'Toggle Sidebar Navigation' },
                { keys: ['Esc'], description: 'Close active modal or drawer' },
            ]
        },
        {
            category: 'Navigation',
            shortcuts: [
                { keys: ['g', 'd'], description: 'Go to Dashboard' },
                { keys: ['g', 'b'], description: 'Go to Barang' },
                { keys: ['g', 'u'], description: 'Go to User Management' },
            ]
        },
        {
            category: 'Editor / Tables',
            shortcuts: [
                { keys: ['/'], description: 'Focus table search input' },
                { keys: ['Enter'], description: 'Open details for selected row' },
                { keys: ['Ctrl', 'S'], description: 'Save current form' },
            ]
        }
    ];

    const filterShortcuts = (categories, term) => {
        if (!term) return categories;
        const lowerTerm = term.toLowerCase();
        
        return categories.map(cat => {
            const filtered = cat.shortcuts.filter(s => 
                s.description.toLowerCase().includes(lowerTerm) || 
                s.keys.join('+').toLowerCase().includes(lowerTerm)
            );
            return { ...cat, shortcuts: filtered };
        }).filter(cat => cat.shortcuts.length > 0);
    };

    const filteredCategories = filterShortcuts(shortcutCategories, searchTerm);

    return (
        <MasterLayout title={title || 'Hotkeys Reference'}>
            <div className="mb-6 pb-4">
                <div className="flex justify-between items-end">
                    <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-1">
                        System-wide Keyboard Shortcuts
                    </p>
                    
                    <div className="relative w-64 max-w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-neutral-500" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search shortcuts..."
                            className="pl-9 w-full bg-neutral-900 border-neutral-800 focus:bg-neutral-950"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category, idx) => (
                        <Card key={idx} title={category.category} className="bg-neutral-950/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.shortcuts.map((shortcut, sIdx) => (
                                    <div key={sIdx} className="flex flex-col space-y-2 p-4 border border-neutral-800 bg-neutral-900 hover:border-cyan-500/30 transition-colors">
                                        <div className="flex space-x-1">
                                            {shortcut.keys.map((key, kIdx) => (
                                                <span 
                                                    key={kIdx} 
                                                    className="px-2 py-1 bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-xs font-bold rounded shadow-[0_2px_0_rgba(0,0,0,0.5)]"
                                                >
                                                    {key}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="font-sans text-sm text-neutral-400">
                                            {shortcut.description}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="py-12 text-center text-neutral-500 font-mono text-sm uppercase tracking-widest">
                        NO_SHORTCUTS_FOUND
                    </div>
                )}
            </div>
        </MasterLayout>
    );
}
