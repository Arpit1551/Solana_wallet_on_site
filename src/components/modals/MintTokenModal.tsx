import React, { useState } from 'react';

interface MintTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onMint: (amount: number) => void;
}

export const MintTokenModal: React.FC<MintTokenModalProps> = ({ 
  isOpen, 
  onClose, 
  balance, 
  onMint 
}) => {
  const [amount, setAmount] = useState<string>('');

  if (!isOpen) return null;

  const handleMint = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onMint(numAmount);
      setAmount('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/20 backdrop-blur-sm px-4">
      {/* Modal Container */}
      <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-[0_24px_48px_rgba(19,27,46,0.12)] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-on-surface tracking-tight">Mint Token</h2>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:bg-surface-container p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-8 pb-8 space-y-6">
          
          {/* Info Block */}
          <div className="bg-surface-container-low p-4 rounded-xl flex items-start space-x-4">
            <span className="material-symbols-outlined text-primary mt-0.5">info</span>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-on-surface">Minting Process</p>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                Tokens are minted directly to your connected wallet. This action requires a small network fee (gas) in SOL.
              </p>
            </div>
          </div>

          {/* Token Selection (Static for now) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">
              Select Token
            </label>
            <div className="bg-surface-container-low rounded-xl px-4 py-4 flex items-center justify-between border-2 border-transparent transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-tr from-purple-500 to-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">SOL</p>
                  <p className="text-[10px] text-on-surface-variant">Solana Native</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-on-surface">{balance.toFixed(2)}</p>
                <p className="text-[10px] text-on-surface-variant">Available</p>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Amount to Mint
              </label>
              <button 
                onClick={() => setAmount(balance.toString())}
                className="text-[10px] text-primary font-bold cursor-pointer hover:underline uppercase"
              >
                Max Amount
              </button>
            </div>
            <div className="relative flex items-center bg-surface-container-low rounded-xl px-4 py-5 focus-within:bg-surface-container-highest transition-all">
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent border-none w-full text-2xl font-medium text-on-surface focus:ring-0 placeholder:text-on-surface-variant/30"
                placeholder="0.00"
              />
              <span className="text-lg font-bold text-on-surface-variant ml-4">SOL</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col space-y-3">
            <button 
              onClick={handleMint}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all"
            >
              Mint Tokens
            </button>
            <button 
              onClick={onClose}
              className="w-full py-4 text-on-surface-variant font-medium text-sm hover:text-on-surface transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Footer Detail */}
        <div className="bg-surface-container-low px-8 py-4 flex justify-between items-center">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Network Status</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
            <span className="text-[11px] font-semibold text-on-surface">Solana Devnet</span>
          </div>
        </div>
      </div>
    </div>
  );
};