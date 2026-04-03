import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { connection } from "../constants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export interface TokenTypes {
    id: string;
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
    updateTokenBalance: (id: string, newBalance: number) => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialized as an empty array to avoid 'null' errors in the UI
    const [tokens, setTokens] = useState<TokenTypes[]>([]);

    const fetchBalance = async (pubkey: string) => {
        try {
            setLoading(true);
            setError(null);
            const key = new PublicKey(pubkey);
            const bal = await connection.getBalance(key);
            setBalance(bal / LAMPORTS_PER_SOL);

            // Note: If you want to populate the tokens array without an import, 
            // you would call an API here or set local state manually.
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
        if (publicKey) {
            fetchBalance(publicKey);

            // Example: Setting local data manually if needed
            setTokens([
                {
                    id: "1",
                    name: "Solana",
                    symbol: "SOL",
                    img: "https://imgs.search.brave.com/rGtWSPdMuAWJ0wtMqZ3d47RoMNxcdY6urOxKFF7st9U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZWxvZ292ZWN0/b3JzLm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wMS9z/b2xhbmEtbG9nby1m/cmVlbG9nb3ZlY3Rv/cnMubmV0Xy00MDB4/MjI1LnBuZw",
                    color: "#8247e5",
                    balance: balance || 0,
                    price: 150,
                    valueUsd: (balance || 0) * 150,
                    change24h: 5.2
                }
            ]);
        } else {
            setBalance(null);
            setTokens([]); // Clear tokens on disconnect
        }
    }, [publicKey, balance]);

    const addToken = (newToken: TokenTypes) => {
        setTokens((prev) => {
            // Prevent duplicates by checking ID
            const exists = prev.find(t => t.id === newToken.id);
            if (exists) return prev;
            return [...prev, newToken];
        });
    };

    const updateTokenBalance = (id: string, newBalance: number) => {
        setTokens((prev) => 
            prev.map((t) => 
                t.id === id 
                ? { ...t, balance: newBalance, valueUsd: newBalance * t.price } 
                : t
            )
        );
    };

    return (
        <WalletContext.Provider
            value={{
                balance,
                publicKey,
                tokens,
                loading,
                error,
                addToken,
                updateTokenBalance,
                setPublicKey,
                refreshBalance
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) throw new Error("useWallet must be used inside WalletProvider");
    return context;
};