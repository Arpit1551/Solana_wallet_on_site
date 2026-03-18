import { useState } from "react";
import { ArrowUp, Send, RefreshCw, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { requestAirDrop } from '@/src/helper/requestAirDrop';
import { useWallet } from '@/src/context/WalletContext';

export const ActionSections = () => {

  const { publicKey, balance, refreshBalance } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleRequestAirDrop = async () =>{
    if(balance > 0.5){
      console.log("You have enough sol for transaction!");
    }else{
      console.log("Request is processing....");
      await requestAirDrop(publicKey);
      await refreshBalance();
    }
  }

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

            <Button className="py-4" onClick={handleRequestAirDrop}>
              <ArrowUp className="w-5 h-5" />
              Airdrop 1 SOL
            </Button>

            <Button variant="outline" className="py-4">
              <Send className="w-5 h-5" />
              Send SOL
            </Button>

            <Button variant="outline" className="py-4">
              <RefreshCw className="w-5 h-5" />
              Swap SOL
            </Button>

          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">Current Balance</span>
              <span className="text-2xl font-bold text-ink">{balance} SOL</span>
            </div>
          </div>
        </Card>

        {/* Token Actions */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-ink">Token Actions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="py-4">
              <Plus className="w-5 h-5" />
              Create Token
            </Button>
            <Button variant="outline" className="py-4">
              <Send className="w-5 h-5" />
              Send Token
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
