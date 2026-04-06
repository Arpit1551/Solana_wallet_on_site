import { useWallet } from "../../context/WalletContext"; 
import { Card } from '../ui/Card';

export const TokenList = () => {
  const { tokens, loading } = useWallet();

  const totalBalance = tokens.reduce((acc, token) => acc + (token.valueUsd ?? 0), 0);

  if (loading) return <Card className="p-8 h-full flex items-center justify-center">Loading...</Card>;

  return (
    <div className="lg:col-span-5">
      <Card className="p-8 h-full">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-ink">Tokens</h3>
          <button className="text-primary text-sm font-semibold hover:underline">View all</button>
        </div>

        <div className="space-y-4">
          {tokens.map(token => (
            <div key={token.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${token.color} rounded-full flex items-center justify-center font-bold text-xs text-white`}>
                  {token.symbol}
                </div>
                <div>
                  <p className="font-semibold text-ink">{token.name}</p>
                  <p className="text-xs text-muted">{token.balance.toLocaleString()} {token.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-ink">${(token.valueUsd ?? 0).toLocaleString()}</p>
                <p className={`text-xs ${(token.change24h ?? 0) > 0 ? 'text-green-500' : (token.change24h ?? 0) < 0 ? 'text-red-500' : 'text-muted'}`}>
                  {(token.change24h ?? 0) > 0 ? '+' : ''}{token.change24h ?? 0}%
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-muted">Total Portfolio Balance (Solana)</p>
          <p className="text-3xl font-bold text-ink mt-1">
            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </Card>
    </div>
  );
};