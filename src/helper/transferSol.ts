import { connection } from "../constants";
import { Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js" ;
import bs58 from 'bs58';

export const transferSol = async (fromPubKey:string ,receiverPubKey: string, amount: number) => {

    const privateKey = localStorage.getItem('secretKey');
    console.log(privateKey);
    const keypair = Keypair.fromSecretKey(bs58.decode(privateKey));

    if(!fromPubKey || !privateKey){
        return;
    }

    try {
        const tx = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(fromPubKey),
                toPubkey: new PublicKey(receiverPubKey),
                lamports: amount
            })
        );

        await sendAndConfirmTransaction(connection, tx, [keypair]);
        return true;

    } catch (error) {
        return error;
    }
}