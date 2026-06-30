import React from 'react';
import MasterLayout from '@/Components/Layout/MasterLayout';
import Card from '@/Components/UI/Card';

export default function DummyPage({ title }) {
    return (
        <MasterLayout title={title}>

            <Card title="Module Status">
                <div className="p-8 border border-neutral-800 border-dashed text-center font-mono text-neutral-500 uppercase tracking-widest">
                    {"[ MODULE_NOT_IMPLEMENTED ]"}
                </div>
            </Card>
        </MasterLayout>
    );
}
