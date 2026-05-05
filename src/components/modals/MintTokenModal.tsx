import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useWallet, TokenTypes } from '@/src/context/WalletContext';

interface MintTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMint: (amount: number, token: TokenTypes) => void;
}

export const MintTokenModal: React.FC<MintTokenModalProps> = ({
  isOpen,
  onClose,
  onMint
}) => {
  const { tokens } = useWallet();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [amount, setAmount] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenTypes | null>(null);

  useEffect(() => {
    if (tokens.length > 0 && !selectedToken) {
      setSelectedToken(tokens[0]);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [tokens, selectedToken]);

  if (!isOpen || !selectedToken) return null;

  const handleMint = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onMint(numAmount, selectedToken);
      setAmount('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131b2e]/20 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-[420px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="px-10 pt-10 pb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#1a1c1e] tracking-tight">Mint Token</h2>
          <button onClick={onClose} className="text-[#424656] hover:text-red-500 transition-colors font-medium text-sm">
            close
          </button>
        </div>

        <div className="px-10 pb-10 space-y-7">
          {/* Info Block */}
          <div className="bg-[#f2f3ff] p-5 rounded-[1.5rem] flex items-start space-x-4">
            <span className="text-[#0061ff] font-bold text-sm italic mt-0.5">info</span>
            <p className="text-[11px] leading-relaxed text-[#424656] opacity-80">
              Minting <strong>{selectedToken.symbol}</strong> will be recorded on the Solana blockchain.
            </p>
          </div>

          {/* Token Selector Container */}
          <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-[10px] font-bold text-[#737687] uppercase tracking-widest ml-1">
              Select Token
            </label>
            
            {/* The Trigger Box */}
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`bg-[#f2f3ff] rounded-[1.25rem] px-5 py-4 flex items-center justify-between cursor-pointer border-2 transition-all ${isDropdownOpen ? 'border-[#0061ff]/20' : 'border-transparent'}`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img src={selectedToken.img} alt={selectedToken.symbol} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1a1c1e]">{selectedToken.symbol}</p>
                  <p className="text-[10px] text-[#737687] font-medium">{selectedToken.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right leading-[1.1]">
                  <p className="text-sm font-bold text-[#1a1c1e]">{selectedToken.balance.toFixed(3)}</p>
                  <p className="text-[10px] text-[#737687] font-medium">Available</p>
                </div>
                <ChevronDown className={`text-[#737687] w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* The Floating List (matching your image) */}
            {isDropdownOpen && (
              <div className="absolute top-[calc(100%-10px)] left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                {tokens.map((token) => (
                  <div 
                    key={token.id}
                    onClick={() => {
                      setSelectedToken(token);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center justify-between px-5 py-4 hover:bg-[#f2f3ff] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={token.img} alt={token.symbol} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-sm font-bold text-[#1a1c1e]">{token.symbol}</span>
                    </div>
                    {selectedToken.id === token.id && (
                      <Check className="w-4 h-4 text-[#0061ff]" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div className={`space-y-2 transition-opacity duration-200 ${isDropdownOpen ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold text-[#737687] uppercase tracking-widest">Amount</label>
              <button 
                onClick={() => setAmount(selectedToken.balance.toString())}
                className="text-[10px] text-[#0061ff] font-extrabold hover:underline uppercase"
              >
                Max Amount
              </button>
            </div>
            <div className="relative flex items-center bg-[#f2f3ff] rounded-[1.25rem] px-6 py-6 focus-within:ring-2 ring-[#0061ff]/20 transition-all">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent border-none w-full text-3xl font-bold text-[#1a1c1e] focus:ring-0 placeholder:text-gray-300 p-0 outline-none"
                placeholder="0.00"
              />
              <span className="text-xl font-bold text-[#1a1c1e] ml-4">{selectedToken.symbol}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleMint}
            className="w-full py-5 bg-[#0061ff] text-white rounded-3xl font-bold text-base shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
          >
            Mint {selectedToken.symbol}
          </button>
        </div>
      </div>
    </div>
  );
};