import { useState } from 'react';
import { MnemonicModal } from '../components/modals/MnemonicModal';
import { WalletOverview } from '../components/dashboard/WalletOverview';
import { ActionSections } from '../components/dashboard/ActionSections';
import { TokenList } from '../components/dashboard/TokenList';
import { TransactionTable } from '../components/dashboard/TransactionTable';
import { useWallet } from '../context/WalletContext';
import { SendSolModal } from '../components/modals/SendSolModel';
import { CreateTokenModal } from '../components/modals/CreateTokenModel';

export const DashboardScreen = () => {
  const MNEMONICS = localStorage.getItem('mnemonics')?.split(" ");

  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showTransferSol, setShowTransferSol] = useState(false);
  const [showCreateToken, setShowCreateToken] = useState(false);

  const pubKey = localStorage.getItem('pubkey');
  const secretKey = localStorage.getItem('secretKey');

  async function main() {

    const { setPublicKey, refreshBalance } = useWallet();
    await setPublicKey(pubKey);
    await refreshBalance();

  } 
  main();

  return (
    <div className="space-y-12">
      <WalletOverview onShowMnemonic={() => setShowMnemonic(true)} pubkey={pubKey} secretKey={secretKey} />

      <ActionSections onShowTransferSol={()=> setShowTransferSol(true)} onShowCreateToken={()=>{setShowCreateToken(true)}} />

      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <TokenList />
          <TransactionTable />
        </div>
      </section>

      <MnemonicModal isOpen={showMnemonic} onClose={() => setShowMnemonic(false)} MNEMONIC={MNEMONICS} />
      <SendSolModal isOpen={showTransferSol} onClose={()=>setShowTransferSol(false)} solPrice={1} />
      <CreateTokenModal isOpen={showCreateToken} onClose={()=>{setShowCreateToken(false)}} />

    </div>
  );
};
