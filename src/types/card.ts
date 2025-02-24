export interface Card {
  number: string;
  expiration: string;
  name: string;
  cvc: string;
  id?: number;
};

export interface Transaction {
  id: number;
  amount: number;
  type: string;
  description: string;
  dated: string;
  origin: string;
  destination: string;
  accountId: number;
}