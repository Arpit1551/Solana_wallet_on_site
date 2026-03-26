import React, { useState } from 'react';
import { PlusCircle, X, Link as LinkIcon, Info, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CreateTokenModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface TokenFormData {
    name: string;
    symbol: string;
    decimals: number;
    supply: string;
    imageUrl: string;
    description: string;
}

export const CreateTokenModal = ({ isOpen, onClose }: CreateTokenModalProps) => {
    const [formData, setFormData] = useState<TokenFormData>({
        name: '',
        symbol: '',
        decimals: 9,
        supply: '',
        imageUrl: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-200"
                    >
                        {/* Header */}
                        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="w-5 h-5 text-[#004bca]" />
                                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create New Token</h2>
                                </div>
                                <p className="text-slate-500 text-sm">Deploy a new SPL token on the Solana mainnet.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Form Content */}
                        <form onSubmit={handleSubmit} className="px-8 py-4 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
                            {/* Identity Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Token Name</label>
                                    <input
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-300"
                                        placeholder="e.g. Solana Gold"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Symbol</label>
                                    <input
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 font-mono placeholder:text-slate-300"
                                        placeholder="e.g. GOLD"
                                        value={formData.symbol}
                                        onChange={e => setFormData({ ...formData, symbol: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Supply Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Decimals</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 font-mono"
                                        value={formData.decimals}
                                        onChange={e => setFormData({ ...formData, decimals: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Initial Supply</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 font-mono"
                                        placeholder="1,000,000"
                                        value={formData.supply}
                                        onChange={e => setFormData({ ...formData, supply: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* URL Section */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Image URL (IPFS/Arweave)</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900"
                                        placeholder="https://arweave.net/..."
                                        value={formData.imageUrl}
                                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                    />
                                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 resize-none min-h-[100px]"
                                    placeholder="The utility and vision behind your token..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex gap-4 items-start">
                                <div className="bg-white p-2 rounded-lg shadow-sm">
                                    <Shield className="w-5 h-5 text-[#004bca]" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-slate-900">Metadata Storage</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Your token metadata will be permanently stored on decentralized storage providers like
                                        <span className="text-[#004bca] font-bold mx-1">IPFS</span> or
                                        <span className="text-[#004bca] font-bold ml-1">Arweave</span>.
                                    </p>
                                </div>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="p-8 bg-slate-50/50 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Solana Mainnet-Beta
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button
                                    onClick={onClose}
                                    className="flex-1 sm:flex-none px-8 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 sm:flex-none px-10 py-3 rounded-xl bg-[#004bca] text-white font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <PlusCircle className="w-4 h-4" />
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