import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection } from "../constants";

export const requestAirDrop = async (pubkey: string) => {
    try {
        const lamports = 0.5 * LAMPORTS_PER_SOL;
        await connection.requestAirdrop(new PublicKey(pubkey), lamports);
        console.log("Air drop done!");
    } catch (error) {
        console.log(error);
    }
}