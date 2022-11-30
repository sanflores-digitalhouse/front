import { IRecord } from '../../components';
import { UserAccount, UserInfo, Card, Transaction } from '../../types';
import {
  UserReponse,
  AccountResponse,
  CardResponse,
  TransactionResponse,
} from '../../utils/api/types';

export const parseRecordContent = (record: any, variant: any): IRecord => {
  return {
    content: { ...record },
    variant,
  };
};

export function parseJwt(token: string) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const parseUserResponseInfo = (user: UserReponse): UserInfo => {
  return {
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email,
    password: user.password,
    phone: user.phone,
    dni: user.dni,
  };
};

export const parseAccountResponseInfo = (
  account: AccountResponse
): UserAccount => {
  return {
    balance: account.available_amount,
    cvu: account.cvu,
    alias: account.alias,
    userId: account.user_id,
    id: account.id,
  };
};

export const parseTransactionResponseInfo = (
  transaction: TransactionResponse
): Transaction => {
  return {
    id: transaction.id,
    amount: transaction.amount,
    type: transaction.type,
    description: transaction.description,
    dated: transaction.dated,
    origin: transaction.origin,
    destination: transaction.destination,
    accountId: transaction.account_id,
  };
};

export const parseCardResponseInfo = (card: CardResponse): Card => {
  return {
    number: card.number_id.toString(),
    name: card.first_last_name,
    expiration: card.expiration_date,
    cvc: card.cod.toString(),
  };
};

export const parseCardInfo = (card: Card): CardResponse => {
  return {
    number_id: parseInt(card.number),
    first_last_name: card.number,
    expiration_date: card.expiration,
    cod: parseInt(card.cvc),
  };
};
