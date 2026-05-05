import { ASSOCIATED_TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token"
import { connection } from "../constants"
import { Keypair, PublicKey } from "@solana/web3.js"
import bs58 from 'bs58'

interface createAssociateTokenAccountProps{
    mintPubkey: PublicKey,
    ownerPubkey?: PublicKey
}

export const createAssociateTokenAccount = async ({ mintPubkey, ownerPubkey } : createAssociateTokenAccountProps)  => {

    if (!mintPubkey) {
        console.log("Invalid Pubkey input!");
        return;
    }

    try {
        const secretKey = localStorage.getItem('secretKey');
        if (!secretKey) {
            console.log("Missing secret key!");
            return;
        }
        const payer = Keypair.fromSecretKey(bs58.decode(secretKey));
        const owner = ownerPubkey ? new PublicKey(ownerPubkey) : payer.publicKey;
        console.log(mintPubkey.toString());
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mintPubkey,
            owner,
            false,
            undefined,
            undefined,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );
        console.log(ata.address);
        return ata.address;
        
    } catch (error) {
        console.log(error);
        return;
    }
}