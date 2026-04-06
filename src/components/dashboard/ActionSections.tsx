import { useState } from "react";
import { ArrowUp, Send, RefreshCw, Plus, Loader2 } from 'lucide-react'; // Added Loader2
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { requestAirDrop } from '@/src/helper/requestAirDrop';
import { useWallet } from '@/src/context/WalletContext';

interface ActionSectionsProps {
  onShowTransferSol: () => void;
  onShowCreateToken: () => void;
}

export const ActionSections = ({ onShowTransferSol, onShowCreateToken }: ActionSectionsProps) => {
  const { publicKey, balance, refreshBalance } = useWallet();
  const displayBalance = balance ?? 0;
  const [loading, setLoading] = useState(false);

  const handleRequestAirDrop = async () => {
    // 1. Basic Validation
    if (!publicKey) return alert("Please connect your wallet first.");

    if (balance != null && balance > 2) {
      alert("You already have plenty of SOL for testing!");
      return;
    }

    setLoading(true);
    try {
      console.log("Request is processing....");
      await requestAirDrop(publicKey);

      setTimeout(async () => {
        await refreshBalance();
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Airdrop failed:", error);
      alert("Airdrop failed. Devnet faucet might be rate-limited.");
      setLoading(false);
    }
  };

  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        <Card className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-xs">SOL</span>
            </div>
            <h3 className="text-xl font-bold text-ink">SOL Actions</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Button
              className="py-4 flex items-center gap-2"
              onClick={handleRequestAirDrop}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
              {loading ? "Processing..." : "Airdrop 1 SOL"}
            </Button>

            <Button variant="outline" className="py-4 flex items-center gap-2" onClick={onShowTransferSol}>
              <Send className="w-5 h-5" />
              Send SOL
            </Button>

            <Button variant="outline" className="py-4 flex items-center gap-2" disabled>
              <RefreshCw className="w-5 h-5 opacity-50" />
              <span className="opacity-50">Swap SOL</span>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">Current Balance</span>
              <span className="text-2xl font-bold text-ink">
                {displayBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} SOL
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-ink">Token Actions</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="py-4 flex items-center gap-2" onClick={onShowCreateToken}>
              <Plus className="w-5 h-5" />
              Create Token
            </Button>
            <Button variant="outline" className="py-4 flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Token
            </Button>
            <Button variant="outline" className="py-4 flex items-center gap-2">
              <Send className="w-5 h-5" />
              Mint Token
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm text-muted text-center italic">Manage your SPL tokens and assets seamlessly</p>
          </div>
        </Card>
      </div>
    </section>
  );
};