import { Keypair, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js"
import bs58 from 'bs58';
import { createInitializeMetadataPointerInstruction, createInitializeMintInstruction, ExtensionType, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import { connection } from "../constants";
import { uploadMetadata } from "../services/uploadMetadataFile";
import { createAssociateTokenAccount } from "./createAta";
import { mintToken } from "./mintToken";

interface createTokenProps {
    name: string,
    symbol: string,
    decimal: number,
    imgUrl: File,
    desc: string,
    amount: number
};

export const createToken = async ({ name, symbol, decimal, imgUrl, desc, amount }: createTokenProps) => {

    try {
        console.log("Enter the create token");
        const userKeypair = await Keypair.fromSecretKey(bs58.decode(localStorage.getItem('secretKey')));
        const mintKeypair = Keypair.generate();

        const getUri = await uploadMetadata({ name, symbol, desc, imgUrl });
        console.log(getUri);

        const metadata = {
            mint: mintKeypair.publicKey,
            name: name,
            symbol: symbol,
            uri: getUri,
            additionalMetadata: []
        };

        const mintSpace = getMintLen([ExtensionType.MetadataPointer]);
        const metadataSpace = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
        const totalSpace = mintSpace + metadataSpace;

        const lamports = await connection.getMinimumBalanceForRentExemption(totalSpace);

        const tx = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: userKeypair.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                lamports: lamports,
                space: mintSpace,
                programId: TOKEN_2022_PROGRAM_ID
            }),

            createInitializeMetadataPointerInstruction(
                mintKeypair.publicKey,
                userKeypair.publicKey,
                mintKeypair.publicKey,
                TOKEN_2022_PROGRAM_ID
            ),

            createInitializeMintInstruction(
                mintKeypair.publicKey,
                decimal,
                userKeypair.publicKey,
                userKeypair.publicKey,
                TOKEN_2022_PROGRAM_ID
            ),

            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                metadata: mintKeypair.publicKey,
                updateAuthority: userKeypair.publicKey,
                mint: mintKeypair.publicKey,
                mintAuthority: userKeypair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri
            })
        );

        const signature = await sendAndConfirmTransaction(connection, tx, [userKeypair, mintKeypair]);
        console.log(signature, mintKeypair.publicKey);

        return {
            tx_sign: signature,
            token_mint: mintKeypair.publicKey
        }
    } catch (error) {
        throw error;
    }
}