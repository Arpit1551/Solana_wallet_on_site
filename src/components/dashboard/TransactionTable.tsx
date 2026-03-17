import { ArrowUp, RefreshCw } from 'lucide-react';
import { TRANSACTIONS } from '../../constants';
import { Card } from '../ui/Card';

export const TransactionTable = () => {
  return (
    <div className="lg:col-span-7">
      <Card className="p-8 h-full">
        <h3 className="text-xl font-bold text-ink mb-8">Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3 px-2">Type</th>
                <th className="pb-3 px-2">Amount</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TRANSACTIONS.map(tx => (
                <tr key={tx.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'Received' ? 'bg-green-50 text-success' : 
                        tx.type === 'Sent' ? 'bg-blue-50 text-blue-600' : 
                        'bg-purple-50 text-purple-600'
                      }`}>
                        {tx.type === 'Received' ? <ArrowUp className="w-4 h-4 rotate-180" /> : 
                         tx.type === 'Sent' ? <ArrowUp className="w-4 h-4" /> : 
                         <RefreshCw className="w-4 h-4" />}
                      </div>
                      <span className="font-medium text-ink">{tx.description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 font-medium text-slate-700">{tx.amount}</td>
                  <td className="py-4 px-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right text-sm text-muted">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <button className="text-sm font-semibold text-muted hover:text-primary transition-colors">Show full history</button>
        </div>
      </Card>
    </div>
  );
};
