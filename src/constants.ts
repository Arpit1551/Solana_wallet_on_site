import { Token, Transaction } from './types';
import { Connection, clusterApiUrl } from "@solana/web3.js";

export const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'Received',
    amount: '+1.50 SOL',
    status: 'Completed',
    date: '2 mins ago',
    description: 'Received SOL',
  },
  {
    id: '2',
    type: 'Sent',
    amount: '-12.00 SOL',
    status: 'Pending',
    date: '1 hour ago',
    description: 'Sent SOL',
  },
  {
    id: '3',
    type: 'Swap',
    amount: '-2.00 SOL',
    status: 'Completed',
    date: 'Oct 24, 2023',
    description: 'Swap SOL → USDC',
  },
];

export const connection = new Connection(clusterApiUrl('devnet'));