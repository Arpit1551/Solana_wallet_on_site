import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { connection } from "../constants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export interface TokenTypes {
    id: number | string;
    name: string;
    symbol: string;
    img: string;
    color: string;
    balance: number;
    price: number;
    valueUsd: number;
    change24h: number;
}

interface WalletContextType {
    balance: number | null;
    publicKey: string | null;
    tokens: TokenTypes[];
    loading: boolean;
    error: string | null;
    setPublicKey: (pubkey: string | null) => void;
    refreshBalance: () => void;
    addToken: (token: TokenTypes) => void;
    updateTokenBalance: (id: number | string, newBalance: number) => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tokens, setTokens] = useState<TokenTypes[]>([]);

    // Helper to update/add the SOL token in the list without wiping others
    const updateSolInList = useCallback((solAmount: number) => {
        setTokens((prev) => {
            const solToken: TokenTypes = {
                id: "native-sol", // Use a fixed string ID
                name: "Solana",
                symbol: "SOL",
                img: "https://imgs.search.brave.com/...", // Shortened for brevity
                color: "#8247e5",
                balance: solAmount,
                price: 150,
                valueUsd: solAmount * 150,
                change24h: 5.2
            };

            const exists = prev.find(t => t.id === "native-sol");
            if (exists) {
                // Just update the balance of the existing SOL entry
                return prev.map(t => t.id === "native-sol" ? solToken : t);
            }
            // If SOL isn't there (first load), add it to the start
            return [solToken, ...prev];
        });
    }, []);

    const fetchBalance = async (pubkey: string) => {
        try {
            setLoading(true);
            const key = new PublicKey(pubkey);
            const bal = await connection.getBalance(key);
            const solAmount = bal / LAMPORTS_PER_SOL;
            
            setBalance(solAmount);
            updateSolInList(solAmount); // Update the list item too
        } catch (err) {
            setError("Failed to fetch balance");
        } finally {
            setLoading(false);
        }
    };

    const refreshBalance = () => {
        if (publicKey) fetchBalance(publicKey);
    };

    // FIX: Remove 'balance' from dependencies to stop the loop
    useEffect(() => {
        if (publicKey) {
            fetchBalance(publicKey);
        } else {
            setBalance(null);
            setTokens([]); 
        }
    }, [publicKey]); // ONLY trigger when the wallet address changes

    const addToken = (newToken: TokenTypes) => {
        setTokens((prev) => {
            // Check for duplicates by symbol to prevent double-adding
            if (prev.find(t => t.symbol === newToken.symbol)) return prev;
            return [...prev, newToken];
        });
    };

    const updateTokenBalance = (id: number | string, newBalance: number) => {
        setTokens((prev) => 
            prev.map((t) => 
                t.id === id 
                ? { ...t, balance: newBalance, valueUsd: newBalance * t.price } 
                : t
            )
        );
    };

    return (
        <WalletContext.Provider value={{
            balance, publicKey, tokens, loading, error,
            addToken, updateTokenBalance, setPublicKey, refreshBalance
        }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) throw new Error("useWallet must be used inside WalletProvider");
    return context;
};