import { generateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import { generateKeypair } from './generateKeyPairs';

export const generateMnemonicFunction = async () => {
    const words = generateMnemonic(wordlist);
    localStorage.setItem('mnemonics', words);
    await generateKeypair(words);
}  