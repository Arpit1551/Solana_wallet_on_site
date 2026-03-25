import { Token, Transaction } from './types';
import { Connection, clusterApiUrl } from "@solana/web3.js";

export const TOKENS: Token[] = [
  {
    id: '1',
    name: 'Solana',
    symbol: 'SOL',
    balance: 145.2,
    valueUsd: 23450.12,
    change24h: 4.2,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: '2',
    name: 'USD Coin',
    symbol: 'USDC',
    balance: 1250.0,
    valueUsd: 1250.0,
    change24h: 0.0,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: '3',
    name: 'Marinade Staked SOL',
    symbol: 'mSOL',
    balance: 85.4,
    valueUsd: 15124.5,
    change24h: 4.5,
    color: 'bg-emerald-100 text-emerald-600',
  },
];

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