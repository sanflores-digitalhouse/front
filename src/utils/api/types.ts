export interface UserReponse {
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
}

export interface AccountResponse {
  alias: string;
  available_amount: number;
  cvu: string;
  id: number;
  user_id: number;
}

export interface TransactionResponse {
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  id: number;
  origin: string;
  type: string;
}

export interface CardResponse {
  cod: number;
  expiration_date: string;
  first_last_name: string;
  number_id: number;
  id?: number;
}
