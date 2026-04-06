import { useState, useEffect } from 'react';
import { MnemonicModal } from '../components/modals/MnemonicModal';
import { WalletOverview } from '../components/dashboard/WalletOverview';
import { ActionSections } from '../components/dashboard/ActionSections';
import { TokenList } from '../components/dashboard/TokenList';
import { TransactionTable } from '../components/dashboard/TransactionTable';
import { useWallet } from '../context/WalletContext';
import { SendSolModal } from '../components/modals/SendSolModel';
import { CreateTokenModal } from '../components/modals/CreateTokenModel';
import { MintTokenModal } from '../components/modals/MintTokenModal'; // Import the new modal

export const DashboardScreen = () => {
  const { setPublicKey, refreshBalance, balance } = useWallet();

  const MNEMONICS = localStorage.getItem('mnemonics')?.split(" ");
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showTransferSol, setShowTransferSol] = useState(false);
  const [showCreateToken, setShowCreateToken] = useState(false);
  const [showMintToken, setShowMintToken] = useState(false); // New state for Mint Modal

  const pubKey = localStorage.getItem('pubkey');
  const secretKey = localStorage.getItem('secretKey');

  useEffect(() => {
    const initializeWallet = async () => {
      if (pubKey) {
        setPublicKey(pubKey);
        refreshBalance();
      }
    };
    initializeWallet();
  }, [pubKey]);

  // Placeholder function for the mint action
  const handleMintAction = (amount: number) => {
    console.log("Minting amount:", amount);
    // You can call your blockchain logic here
  };

  return (
    <div className="space-y-12">
      <WalletOverview 
        onShowMnemonic={() => setShowMnemonic(true)} 
        pubkey={pubKey} 
        secretKey={secretKey} 
      />

      <ActionSections 
        onShowTransferSol={() => setShowTransferSol(true)} 
        onShowCreateToken={() => setShowCreateToken(true)}
        onShowMintToken={() => setShowMintToken(true)} // Pass the trigger here
      />

      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <TokenList />
          <TransactionTable />
        </div>
      </section>

      {/* Modals */}
      <MnemonicModal 
        isOpen={showMnemonic} 
        onClose={() => setShowMnemonic(false)} 
        MNEMONIC={MNEMONICS} 
      />
      
      <SendSolModal 
        isOpen={showTransferSol} 
        onClose={() => setShowTransferSol(false)} 
        solPrice={1} 
      />
      
      <CreateTokenModal 
        isOpen={showCreateToken} 
        onClose={() => setShowCreateToken(false)} 
      />

      {/* Integrated Mint Token Modal */}
      <MintTokenModal 
        isOpen={showMintToken} 
        onClose={() => setShowMintToken(false)} 
        balance={balance || 0}
        onMint={handleMintAction}
      />
    </div>
  );
};