import React from 'react';
import MasterLayout from '@/Components/Layout/MasterLayout';
import Card from '@/Components/UI/Card';

export default function DummyPage({ title }) {
    return (
        <MasterLayout>
            <div className="mb-8 border-b border-neutral-800 pb-4">
                <h1 className="font-mono text-2xl font-bold text-cyan-400 tracking-widest uppercase">
                    {title}
                </h1>
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-1">
                    Work in Progress
                </p>
            </div>

            <Card title="Module Status">
                <div className="p-8 border border-neutral-800 border-dashed text-center font-mono text-neutral-500 uppercase tracking-widest">
                    {"[ MODULE_NOT_IMPLEMENTED ]"}
                </div>
            </Card>
        </MasterLayout>
    );
}
