import { useState } from 'react';
import { Download, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Textarea } from '../components/ui/Textarea';
import { generateKeypair } from '../helper/generateKeyPairs';

export const ImportScreen = ({ onBack, onImport }: { onBack: () => void, onImport: () => void }) => {

  const [mnemonic, setMnemonic] = useState('');

  const handleWalletImport = () => {
    let check = mnemonic.split(" ");

    if(check.length < 12){
      console.log("Enter atleat 12 char");
    }

    generateKeypair(mnemonic);
    localStorage.setItem('mnemonics', mnemonic);
  }
  return (
    <section className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <Card className="overflow-hidden p-0">
          <div className="p-8 border-b border-slate-100 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-ink">Import Wallet</h1>
            <p className="text-muted mt-2">Enter your secret recovery phrase to restore your Solana account.</p>
          </div>
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <p className="text-sm text-amber-800">
                  Make sure you are in a private location. Never share your recovery phrase with anyone.
                </p>
              </div>
              <Textarea
                label="Secret Recovery Phrase"
                placeholder="Enter your 12 or 24-word recovery phrase (mnemonic), words separated by spaces"
                className="min-h-40"
                value={mnemonic}
                onChange={(e) => { setMnemonic(e.target.value) }}
              />
            </div>
            <div className="space-y-3 mt-8">
              <Button
                onClick={ async () => {
                  await handleWalletImport(),
                  onImport();
                }}
                className="w-full py-4"
              >
                <Download className="w-5 h-5" />
                Import Wallet
              </Button>
              <Button
                onClick={onBack}
                variant="secondary"
                className="w-full py-4"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
};
