import { useState, useEffect } from 'react';
import { MnemonicModal } from '../components/modals/MnemonicModal';
import { WalletOverview } from '../components/dashboard/WalletOverview';
import { ActionSections } from '../components/dashboard/ActionSections';
import { TokenList } from '../components/dashboard/TokenList';
import { TransactionTable } from '../components/dashboard/TransactionTable';
import { TokenTypes, useWallet } from '../context/WalletContext';
import { SendSolModal } from '../components/modals/SendSolModel';
import { CreateTokenModal } from '../components/modals/CreateTokenModel';
import { MintTokenModal } from '../components/modals/MintTokenModal'; // Import the new modal
import { mintToken } from '../helper/mintToken';
import { createAssociateTokenAccount } from '../helper/createAta';
import { PublicKey } from '@solana/web3.js';

export const DashboardScreen = () => {
  const { setPublicKey, refreshBalance, balance } = useWallet();

  const MNEMONICS = localStorage.getItem('mnemonics')?.split(" ") || [];
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showTransferSol, setShowTransferSol] = useState(false);
  const [showCreateToken, setShowCreateToken] = useState(false);
  const [showMintToken, setShowMintToken] = useState(false); // New state for Mint Modal

  const pubKey = localStorage.getItem('pubkey');
  const secretKey = localStorage.getItem('secretKey');

  if (!pubKey || !secretKey) {
    console.log("Cannot get pubkey and secret key!");
    return;
  }

  useEffect(() => {
    const initializeWallet = async () => {
      if (pubKey) {
        setPublicKey(pubKey);
        refreshBalance();
      }
    };
    initializeWallet();
  }, [pubKey]);

  const handleMintAction = async (amount: number, token: TokenTypes) => {

    if (token.token_mint) {
      let ata = await createAssociateTokenAccount({ mintPubkey: new PublicKey(token.token_mint) });
      if (ata) {
        let response = await mintToken({ mintPubkey: new PublicKey(token.token_mint), ataAddress: ata, amount: amount, decimals: token.decimals });
        console.log(response);
      }
    };

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
        onMint={handleMintAction}
      />
    </div>
  );
};