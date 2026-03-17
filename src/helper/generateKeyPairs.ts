import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { HDKey } from "micro-ed25519-hdkey";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const DERIVATION_PATH = "m/44'/501'/0'/0'";

export const generateKeypair = (mnemonic: string): void => {
  if (!mnemonic || !mnemonic.trim()) {
    throw new Error("Mnemonic is required");
  }

  console.log(mnemonic);
  const masterSeed = mnemonicToSeedSync(mnemonic);
  const hdKey = HDKey.fromMasterSeed(masterSeed);
  const derivedKey = hdKey.derive(DERIVATION_PATH);

  if (!derivedKey.privateKey) {
    throw new Error("Failed to derive private key");
  }

  const naclKeypair = nacl.sign.keyPair.fromSeed(derivedKey.privateKey);
  const keypair = Keypair.fromSecretKey(naclKeypair.secretKey);

  localStorage.setItem("pubkey", keypair.publicKey.toBase58());
  localStorage.setItem("secretKey", bs58.encode(keypair.secretKey.slice(0, 32)));
};