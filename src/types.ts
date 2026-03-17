export interface Token {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  valueUsd: number;
  change24h: number;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'Received' | 'Sent' | 'Swap';
  amount: string;
  status: 'Completed' | 'Pending';
  date: string;
  description: string;
}

export type Screen = 'welcome' | 'import' | 'dashboard';
