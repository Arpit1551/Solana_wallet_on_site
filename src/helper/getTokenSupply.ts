import { PublicKey } from "@solana/web3.js";
import { connection } from "../constants";

export const getTotalTokenSupply = (tokenMint: PublicKey) => {
    try {
        const supply = connection.getTokenSupply(tokenMint);
        return supply;
    } catch (error) {
        return error;
    }
}