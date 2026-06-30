import React, { useState } from 'react';
import MasterLayout from '@/Components/Layout/MasterLayout';
import Card from '@/Components/UI/Card';
import DataTable from '@/Components/UI/DataTable';
import Drawer from '@/Components/UI/Drawer';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Label from '@/Components/UI/Label';
import FlashMessage from '@/Components/UI/FlashMessage';

export default function UserManagement({ title }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [flashMsg, setFlashMsg] = useState('');

    // Dummy Data
    const mockUsers = [
        { id: 1, name: 'System Administrator', username: 'admin_01', role: 'ADMIN', status: 'ACTIVE' },
        { id: 2, name: 'System Bot', username: 'sys_bot', role: 'SYSTEM', status: 'ACTIVE' },
        { id: 3, name: 'Staff Jakarta', username: 'staff_jkt', role: 'USER', status: 'INACTIVE' },
        { id: 4, name: 'Manager Ops', username: 'admin_02', role: 'ADMIN', status: 'ACTIVE' },
    ];

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Username', cell: (row) => <span className="text-cyan-500 font-bold">@{row.username}</span> },
        { header: 'Role', cell: (row) => (
            <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border ${
                row.role === 'ADMIN' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' :
                row.role === 'SYSTEM' ? 'border-rose-500/50 text-rose-400 bg-rose-500/10' :
                'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'
            }`}>
                {row.role}
            </span>
        ) },
        { header: 'Status', cell: (row) => (
             <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase ${
                row.status === 'ACTIVE' ? 'text-emerald-400' : 'text-neutral-500'
            }`}>
                {row.status}
            </span>
        ) },
        { header: 'Actions', cell: (row) => (
            <div className="flex space-x-2">
                <Button variant="secondary" onClick={() => setSelectedUser(row)}>Manage</Button>
            </div>
        ) },
    ];

    const handleSaveUser = () => {
        setFlashMsg(`User ${selectedUser.username} updated successfully.`);
        setSelectedUser(null);
    };

    return (
        <MasterLayout title={title || 'User Management'}>
            <FlashMessage message={flashMsg} onClose={() => setFlashMsg('')} />
            
            <div className="mb-6 flex justify-between items-end pb-4">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-1">
                    Manage system access and roles
                </p>
                <Button>+ New User</Button>
            </div>

            <Card title="User Database">
                <DataTable columns={columns} data={mockUsers} />
            </Card>

            <Drawer 
                show={!!selectedUser} 
                onClose={() => setSelectedUser(null)} 
                title={selectedUser ? `User: ${selectedUser.username}` : ''}
            >
                {selectedUser && (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4 border-b border-neutral-800 pb-6">
                            <div className="w-16 h-16 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-2xl font-mono text-cyan-400">
                                {selectedUser.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-mono font-bold text-lg text-neutral-200">{selectedUser.name}</div>
                                <div className="font-mono text-sm text-cyan-500">@{selectedUser.username}</div>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <Label value="Full Name" />
                                <Input type="text" className="w-full" defaultValue={selectedUser.name} />
                            </div>
                            
                            <div>
                                <Label value="Role Assignment" />
                                <select className="w-full font-mono bg-neutral-900 border border-neutral-700 text-neutral-200 focus:border-cyan-400 focus:ring-cyan-400 px-3 py-2 outline-none">
                                    <option value="ADMIN" selected={selectedUser.role === 'ADMIN'}>ADMINISTRATOR</option>
                                    <option value="USER" selected={selectedUser.role === 'USER'}>STANDARD USER</option>
                                    <option value="SYSTEM" selected={selectedUser.role === 'SYSTEM'}>SYSTEM ACCOUNT</option>
                                </select>
                            </div>

                            <div>
                                <Label value="Account Status" />
                                <div className="flex space-x-4 mt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="status" className="text-cyan-500 bg-neutral-900 border-neutral-700 focus:ring-cyan-500 focus:ring-offset-neutral-950" defaultChecked={selectedUser.status === 'ACTIVE'} />
                                        <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest">Active</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="status" className="text-cyan-500 bg-neutral-900 border-neutral-700 focus:ring-cyan-500 focus:ring-offset-neutral-950" defaultChecked={selectedUser.status === 'INACTIVE'} />
                                        <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest">Inactive</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-neutral-800">
                                <Label value="Reset Password" />
                                <Input type="password" placeholder="Enter new password" className="w-full mb-2" />
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-neutral-800">
                                <Button variant="danger">Delete</Button>
                                <div className="space-x-2">
                                    <Button variant="secondary" onClick={() => setSelectedUser(null)}>Cancel</Button>
                                    <Button onClick={handleSaveUser}>Save Changes</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </Drawer>
        </MasterLayout>
    );
}
