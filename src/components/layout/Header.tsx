import { Wallet } from 'lucide-react';

export const Header = () => (
  <header className="flex justify-center pt-12 pb-4">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
        <Wallet className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold tracking-tight text-ink">SolanaWallet</span>
    </div>
  </header>
);
