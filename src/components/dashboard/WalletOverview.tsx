import { Copy, Eye, EyeOff, Key } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface WalletOverviewProps {
  onShowMnemonic: () => void;
  pubkey: string;
  secretKey: string;
}

export const WalletOverview = ({ onShowMnemonic, pubkey, secretKey }: WalletOverviewProps) => {
  const [isSecretVisible, setIsSecretVisible] = useState(false);

  return (
    <section className="hero-gradient pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-tight mb-4">Your Wallet</h1>
        <p className="text-lg text-muted mb-10 max-w-xl mx-auto leading-relaxed">Securely manage your keys and recovery phrases.</p>
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="text-left">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Public Key</label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <code className="text-sm font-mono text-slate-700 break-all flex-1">{pubkey}</code>
                  <button className="text-slate-400 hover:text-primary transition-colors">
                      <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Private Key</label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <code className="text-sm font-mono text-slate-700 break-all flex-1">
                    {isSecretVisible ? secretKey : '*'.repeat(Math.min(secretKey.length, 64))}
                  </code>
                  <button
                    onClick={() => setIsSecretVisible((prev) => !prev)}
                    className="text-slate-400 hover:text-primary transition-colors shrink-0"
                    aria-label={isSecretVisible ? 'Hide private key' : 'Show private key'}
                  >
                    {isSecretVisible ? <EyeOff className="w-5 h-5 cursor-pointer" /> : <Eye className="w-5 h-5 cursor-pointer" />}
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button onClick={onShowMnemonic}>
              <Key className="w-5 h-5" />
              Show Mnemonic
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};