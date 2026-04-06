import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, X, Image as ImageIcon, Upload, Hash, Loader2 } from 'lucide-react';
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
    imageFile: File | null;
    imagePreview: string;
    description: string;
}

export const CreateTokenModal = ({ isOpen, onClose }: CreateTokenModalProps) => {
    const { tokens, addToken } = useWallet();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<TokenFormData>({
        name: '',
        symbol: '',
        decimals: 9,
        imageFile: null,
        imagePreview: '',
        description: ''
    });

    // Clean up object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            if (formData.imagePreview) URL.revokeObjectURL(formData.imagePreview);
        };
    }, [formData.imagePreview]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Revoke old URL before creating new one
            if (formData.imagePreview) URL.revokeObjectURL(formData.imagePreview);

            setFormData((prev: any) => ({
                ...prev,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageFile) return alert('Please upload a token icon');

        setIsSubmitting(true);
        try {
            const response = await createToken({
                name: formData.name,
                symbol: formData.symbol,
                decimal: formData.decimals,
                imgUrl: formData.imageFile,
                desc: formData.description
            });

            if (response?.success) {
                await addToken({
                    id: tokens.length,
                    name: formData.name,
                    symbol: formData.symbol,
                    img: response.img_url,
                    color: "#8247e5",
                    balance: 0,
                    price: 0,
                    valueUsd: 0,
                    change24h: 0
                });
                onClose();
            } else {
                alert("Token creation failed. Please check your balance.");
            }
        } catch (error) {
            console.error("Creation Error:", error);
            alert("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isSubmitting ? onClose : undefined}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/40"
                    >
                        {/* Header */}
                        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create New Token</h2>
                                <p className="text-slate-500 text-sm">Configure and deploy your SPL token on Solana.</p>
                            </div>
                            <button
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 disabled:opacity-50"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="px-8 py-4 space-y-6 overflow-y-auto max-h-[70vh]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Token Name</label>
                                    <input
                                        required
                                        className="w-full bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        placeholder="e.g. Solana Gold"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Symbol</label>
                                    <input
                                        required
                                        className="w-full bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-mono"
                                        placeholder="SOLG"
                                        value={formData.symbol}
                                        onChange={e => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                        <Hash className="w-3 h-3" /> Decimals
                                    </label>
                                    <input
                                        type="number"
                                        max="12"
                                        min="0"
                                        className="w-full bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-mono"
                                        value={formData.decimals}
                                        onChange={e => setFormData({ ...formData, decimals: parseInt(e.target.value) || 0 })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Token Icon</label>
                                    <div
                                        onClick={() => !isSubmitting && fileInputRef.current?.click()}
                                        className="relative group cursor-pointer w-24 h-24"
                                    >
                                        <div className="w-full h-full rounded-3xl border-2 border-dashed border-slate-200 bg-slate-100/30 flex flex-col items-center justify-center transition-all group-hover:border-blue-400 overflow-hidden">
                                            {formData.imagePreview ? (
                                                <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-6 h-6 text-slate-300" />
                                            )}
                                        </div>
                                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    className="w-full h-24 bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                                    placeholder="What's this token for?"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="p-8 bg-slate-50/80 backdrop-blur-md flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Devnet Active
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    className="px-6 py-3 rounded-2xl text-slate-500 font-bold hover:bg-slate-200/50 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="px-10 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:bg-slate-400 disabled:translate-y-0"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <PlusCircle className="w-5 h-5" />
                                    )}
                                    {isSubmitting ? 'Deploying...' : 'Create Token'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};