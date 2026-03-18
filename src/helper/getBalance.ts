import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const getBalance = async () => {
    const pubkey = localStorage.getItem('pubkey');

    const connection = new Connection(clusterApiUrl('devnet'));

    const balance = await connection.getBalance(new PublicKey(pubkey));

    return balance / LAMPORTS_PER_SOL;
}