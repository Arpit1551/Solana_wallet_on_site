import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import { connection } from "../constants"
import { Keypair, PublicKey } from "@solana/web3.js"
import bs58 from 'bs58'

export const createAssociateTokenAccount = async (mintPubkey: string) => {

    const payer = Keypair.fromSecretKey(bs58.decode(localStorage.getItem('secretKey')));

    const ata = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        new PublicKey(mintPubkey),
        payer.publicKey,
    );
    console.log(ata);
    return ata.address;
}