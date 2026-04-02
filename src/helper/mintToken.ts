import { mintTo } from "@solana/spl-token"
import { connection } from "../constants"
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

interface mintTokenProps{
    mintPubkey: PublicKey,
    ataAddress: PublicKey,
    amount: number
}

export const mintToken = async ({mintPubkey, ataAddress, amount}: mintTokenProps) => {

    const payer = Keypair.fromSecretKey(bs58.decode(localStorage.getItem('secretKey')));

    const signature = await mintTo(
        connection, 
        payer, 
        new PublicKey(mintPubkey), 
        new PublicKey(ataAddress), 
        payer.publicKey, 
        amount
    );

    return signature;
}