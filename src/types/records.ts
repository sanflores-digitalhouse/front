export interface Transaction {
  amount: number;
  name?: string;
  date: string;
  id?: string;
}

export interface Card {
  number: string;
  name: string;
  type: string;
  id: string;
}

export interface Account {
  name: string;
}

export enum ActivityType {
  TRANSFER_IN = 'transfer-in',
  TRANSFER_OUT = 'transfer-out',
  INCOME = 'income',
}
