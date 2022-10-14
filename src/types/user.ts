export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  dni?: string;
  id?: string;
}

export interface UserAccount {
  balance: string;
  cvu: string;
  alias: string;
  userId: string;
}
