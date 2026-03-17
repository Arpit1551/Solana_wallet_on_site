import { Plus, ArrowRight } from 'lucide-react';
import { Screen } from '../types';
import { Card } from '../components/ui/Card';
import { generateMnemonicFunction } from '../helper/generateMnemonic';

export const WelcomeScreen = ({ onNext }: { onNext: (screen: Screen) => void }) => (
  <section className="hero-gradient pt-20 pb-16 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-tight mb-4">Welcome to Solana</h1>
      <p className="text-lg text-muted mb-12 max-w-xl mx-auto leading-relaxed">
        The fastest and most secure way to manage your Solana assets. Choose an option below to get started.
      </p>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-2xl mx-auto">
        <button 
          onClick={async () => {
            await generateMnemonicFunction();
            onNext('dashboard');
          }}
          className="flex-1 text-left group"
        >
          <Card className="p-6 h-full border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
              <Plus className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <h3 className="text-lg font-bold text-ink mb-2">Create New Wallet</h3>
            <p className="text-sm text-muted">Generate a new secure seed phrase and start using Solana instantly.</p>
          </Card>
        </button>
        <button 
          onClick={() => onNext('import')}
          className="flex-1 text-left group"
        >
          <Card className="p-6 h-full border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
              <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-white" />
            </div>
            <h3 className="text-lg font-bold text-ink mb-2">Import Existing Wallet</h3>
            <p className="text-sm text-muted">Use your recovery phrase or private key to access your existing funds.</p>
          </Card>
        </button>
      </div>
    </div>
  </section>
);
