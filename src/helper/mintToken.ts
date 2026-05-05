import { mintTo, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token"
import { connection } from "../constants"
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

interface mintTokenProps{
    mintPubkey: PublicKey;
    ataAddress: PublicKey;
    amount: number;
    decimals: number;
}

export const mintToken = async ({ mintPubkey, ataAddress, amount, decimals }: mintTokenProps) => {

    const secretKey = await localStorage.getItem('secretKey');
    let mint_amount = amount * decimals;

    if(!secretKey){
        console.log("Cannot get secret key of the user !");
        return;
    }
    const payer = Keypair.fromSecretKey(bs58.decode(secretKey));

    const signature = await mintTo(
        connection, 
        payer, 
        new PublicKey(mintPubkey), 
        new PublicKey(ataAddress), 
        payer.publicKey, 
        mint_amount,
        undefined,
        undefined,
        TOKEN_2022_PROGRAM_ID
    );

    return signature;
}