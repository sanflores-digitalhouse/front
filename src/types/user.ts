export interface UserAccount {
  balance: number;
  cvu: string;
  alias: string;
  userId: number;
  id: number;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  dni?: number;
  id?: string;
}
export interface User {
  info: UserInfo;
  account: UserAccount;
}
