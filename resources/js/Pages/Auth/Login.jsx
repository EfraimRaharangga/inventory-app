import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import Card from '@/Components/UI/Card';
import Input from '@/Components/UI/Input';
import Label from '@/Components/UI/Label';
import Button from '@/Components/UI/Button';
import FlashMessage from '@/Components/UI/FlashMessage';

export default function Login() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const flashMsg = flash?.error || flash?.success;
    const flashType = flash?.error ? 'error' : 'success';

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-300 font-sans p-4">
            <Head title="System Authentication" />

            {flashMsg && <FlashMessage message={flashMsg} type={flashType} onClose={() => { }} />}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="flex flex-col items-center justify-center mb-8 text-cyan-400">
                    <Terminal size={48} className="mb-4" />
                    <h1 className="font-mono text-2xl font-bold tracking-[0.2em] uppercase">
                        Inventory App
                    </h1>
                    <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-2">
                        Selamat datang, silahkan login
                    </p>
                </div>

                <Card className="shadow-2xl">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="username" value="Username" />
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('username', e.target.value)}
                                hasError={!!errors.username}
                                placeholder="Enter system username"
                            />
                            {errors.username && (
                                <p className="font-mono text-xs text-rose-500 mt-2 tracking-wide">
                                    [{errors.username}]
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password" value="Password" />
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                hasError={!!errors.password}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="font-mono text-xs text-rose-500 mt-2 tracking-wide">
                                    [{errors.password}]
                                </p>
                            )}
                        </div>

                        <div className="block mt-4 border-t border-neutral-800 pt-4">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="appearance-none w-4 h-4 border border-neutral-700 bg-neutral-900 checked:bg-cyan-500/20 checked:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:ring-offset-1 focus:ring-offset-neutral-950 transition-colors"
                                    />
                                    {data.remember && (
                                        <svg
                                            className="absolute w-3 h-3 text-cyan-400 left-0.5 top-0.5 pointer-events-none"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end mt-4 pt-4 border-t border-neutral-800">
                            <Button type="submit" className="w-full justify-center py-3 text-sm" processing={processing} >
                                Login
                            </Button>
                        </div>
                    </form>
                </Card>

            </motion.div>
        </div>
    );
}
