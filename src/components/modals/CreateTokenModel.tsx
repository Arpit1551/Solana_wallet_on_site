import React, { useState, useRef } from 'react';
import { PlusCircle, X, Image as ImageIcon, Shield, Upload, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createToken } from '@/src/helper/createToken';
import { useWallet } from '@/src/context/WalletContext';

interface CreateTokenModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface TokenFormData {
    name: string;
    symbol: string;
    decimals: number;
    supply: string;
    imageFile: File | null;
    imagePreview: string;
    description: string;
}

export const CreateTokenModal = ({ isOpen, onClose }: CreateTokenModalProps) => {
    const { publicKey } = useWallet();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<TokenFormData>({
        name: '',
        symbol: '',
        decimals: 9,
        supply: '0',
        imageFile: null,
        imagePreview: '',
        description: ''
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({
                ...formData,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageFile) {
            alert('Please upload a token icon');
            return;
        }
        await createToken({
            name: formData.name,
            symbol: formData.symbol,
            decimal: formData.decimals,
            imgUrl: formData.imageFile,
            desc: formData.description,
            amount: Number(formData.supply)
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col border border-white/40"
                    >
                        {/* Header */}
                        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create New Token</h2>
                                </div>
                                <p className="text-slate-500 text-sm">Configure and deploy your SPL token on Solana.</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="px-8 py-4 space-y-6 overflow-y-auto max-h-[75vh] scrollbar-hide">

                            {/* Row 1: Name & Symbol */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Token Name</label>
                                    <input
                                        className="w-full bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                        placeholder="Token Name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Symbol</label>
                                    <input
                                        className="w-full bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 font-mono placeholder:text-slate-400"
                                        placeholder="Token Symbol"
                                        value={formData.symbol}
                                        onChange={e => setFormData({ ...formData, symbol: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Decimals & Token Icon (Side by Side) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                        <Hash className="w-3 h-3" /> Decimals
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 font-mono"
                                        value={formData.decimals}
                                        onChange={e => setFormData({ ...formData, decimals: parseInt(e.target.value) })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Token Icon</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="relative group cursor-pointer w-32 h-32"
                                    >
                                        <div className="w-full h-full rounded-3xl border-2 border-dashed border-slate-200 bg-slate-100/30 flex flex-col items-center justify-center transition-all group-hover:border-blue-400 group-hover:bg-blue-50/30 overflow-hidden shadow-inner">
                                            {formData.imagePreview ? (
                                                <div className="relative w-full h-full">
                                                    <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Upload className="text-white w-6 h-6" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                                                    <p className="text-[10px] font-medium text-slate-400">Upload</p>
                                                </>
                                            )}
                                        </div>
                                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Full Width Description */}
                            <div className="space-y-1.5 w-full">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    className="w-full h-32 bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 resize-none placeholder:text-slate-400"
                                    placeholder="The utility and vision behind your token..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                        </form>

                        {/* Footer */}
                        <div className="p-8 bg-slate-50/80 backdrop-blur-md flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 mt-auto">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                                Devnet
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button onClick={onClose} className="px-6 py-3 rounded-2xl text-slate-500 font-bold hover:bg-slate-200/50 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-10 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    Create Token
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};