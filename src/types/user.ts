export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  balance: number;
  account: {
    activities: {
      sourceAccount: string;
      amount: number;
      date: string;
    }[];
    cards: {
      number: string;
      name: string;
      expiration: string;
      cvc: string;
    }[];
    accounts: {
      name: string;
    }[];
  };
}

export interface UserAccount {
  balance: string;
  cvu: string;
  alias: string;
} 
