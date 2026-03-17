import { Wallet, Twitter, Github } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-slate-50 border-t border-slate-100 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-ink">SolanaWallet</span>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            The world's most secure and user-friendly Solana-first crypto wallet.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-ink uppercase tracking-widest mb-4">Product</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-muted hover:text-primary transition-colors">Wallet</a></li>
            <li><a href="#" className="text-sm text-muted hover:text-primary transition-colors">Exchange</a></li>
            <li><a href="#" className="text-sm text-muted hover:text-primary transition-colors">NFTs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-ink uppercase tracking-widest mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-muted hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="text-sm text-muted hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="text-sm text-muted hover:text-primary transition-colors">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-ink uppercase tracking-widest mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-muted hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="text-sm text-muted hover:text-primary transition-colors">Security</a></li>
            <li><a href="#" className="text-sm text-muted hover:text-primary transition-colors">Legal</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-400">© 2023 SolanaWallet Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
  </footer>
);
