import React, { useState, useEffect } from 'react';
import { Send, X, Copy, Info, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWallet } from "../../context/WalletContext";
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { transferSol } from '@/src/helper/transferSol';

interface SendSolModalProps {
  isOpen: boolean;
  onClose: () => void;
  solPrice: number;
}

export const SendSolModal = ({ isOpen, onClose, solPrice }: SendSolModalProps) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [usdValue, setUsdValue] = useState('0.00');
  const [isLoading, setIsLoading] = useState(false);
  
  const { publicKey, balance, refreshBalance } = useWallet();
  const networkFee = 0.000005;

  const handleSendSol = async () => {
    if (!address || !amount || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    try {
      console.log("Transferring...");
      // Using Math.round to avoid floating point issues with Lamports
      const lamports = Math.round(parseFloat(amount) * LAMPORTS_PER_SOL);
      const response = await transferSol(publicKey, address, lamports);
      
      if (response) {
        console.log("Transaction Successful!!");
        await refreshBalance();
        onClose(); // Call the function
      } else {
        console.error("Transaction Failed!!");
      }
    } catch (error) {
      console.error("Error during transfer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAddress(text);
    } catch (err) {
      console.error("Failed to read clipboard");
    }
  };

  useEffect(() => {
    const calculated = parseFloat(amount || '0') * solPrice;
    setUsdValue(calculated.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }));
  }, [amount, solPrice]);

  const handleMax = () => {
    const maxAmount = Math.max(0, balance - networkFee);
    setAmount(maxAmount.toFixed(6));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden bg-white"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Send className="w-5 h-5 text-[#004bca]" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Send SOL</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Recipient Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Recipient Address</label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 font-mono text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter Solana address..."
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <button 
                        onClick={handlePaste}
                        className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors flex items-center gap-1 px-3"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Paste</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Amount</label>
                    <span className="text-xs text-slate-500 font-medium">
                      Balance: <span className="text-slate-900">{balance.toFixed(4)} SOL</span>
                    </span>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                       <div className="w-6 h-6 rounded-full bg-[#0061ff] flex items-center justify-center text-[8px] text-white font-black">SOL</div>
                    </div>
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-14 pr-20 py-5 text-2xl font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all tabular-nums"
                      placeholder="0.00"
                    />
                    <button 
                      onClick={handleMax}
                      className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#004bca] text-[10px] font-black rounded-lg transition-all uppercase"
                    >
                      Max
                    </button>
                  </div>
                  <div className="flex justify-end pt-1">
                    <span className="text-xs text-slate-400 font-medium italic">≈ ${usdValue} USD</span>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-semibold">Estimated Fee</span>
                    <span className="text-slate-700 font-mono">{networkFee} SOL</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">Total (Incl. Fee)</span>
                    <p className="text-sm font-bold text-[#004bca]">
                      {(parseFloat(amount || '0') + networkFee).toFixed(6)} SOL
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-2">
                  <button 
                    disabled={isLoading || !address || !amount}
                    className="w-full py-4 bg-[#004bca] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                    onClick={handleSendSol}
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send SOL'}
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full py-4 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 px-8 py-3 flex items-center justify-center gap-2 border-t border-blue-100/50">
              <Info className="w-3.5 h-3.5 text-[#004bca]" />
              <p className="text-[10px] font-bold text-[#004bca] uppercase tracking-tighter">
                Instant confirmation on Solana Mainnet
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};