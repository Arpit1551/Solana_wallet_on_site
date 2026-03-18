import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { connection } from "../constants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

interface WalletContextType {
    balance: number | null;
    pubKey: PublicKey | null;
    loading: boolean;
    error: string | null;
    setPubkey: (pubkey: string) => void;
    refreshPubkey: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {

    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBalance = async (pubkey: string) => {
        try {
            setLoading(true);
            setError(null);
            const bal = await connection.getBalance(new PublicKey(pubkey));
            setBalance(bal / LAMPORTS_PER_SOL);
        } catch (err) {
            setError("Invalid public key or network error");
            setBalance(null);
        } finally {
            setLoading(false);
        }
    };

    const refreshBalance = () => {
        if (publicKey) fetchBalance(publicKey);
    };

    useEffect(() => {
        if (publicKey) fetchBalance(publicKey);
    }, [publicKey]);

    return (
        <WalletContext.Provider
    value= {{ balance, publicKey, loading, error, setPublicKey, refreshBalance }}
  >
    { children }
    </WalletContext.Provider>
);
}

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) throw new Error("useWallet must be used inside WalletProvider");
    return context;
};