import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import { connection } from "../constants"
import { Keypair, PublicKey } from "@solana/web3.js"
import bs58 from 'bs58'

interface createAssociateTokenAccountProps{
    mintPubkey: PublicKey,
    ownerPubkey?: PublicKey
}

export const createAssociateTokenAccount = async ( {mintPubkey, ownerPubkey} : createAssociateTokenAccountProps)  => {

    if(!new PublicKey(mintPubkey) || !new PublicKey(ownerPubkey)){
        console.log("Invalid Pubkey input!");
        return; 
    }

    try {
        const payer = Keypair.fromSecretKey(bs58.decode(localStorage.getItem('secretKey')));
        const owner = ownerPubkey ? new PublicKey(ownerPubkey) : payer.publicKey;
        console.log(mintPubkey.toString());
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mintPubkey,
            owner
        );
        console.log(ata.address);
        return ata.address;
        
    } catch (error) {
        console.log(error);
        return;
    }
}