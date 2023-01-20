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

export const parseAccountInfo = (account: UserAccount): AccountResponse => {
  return {
    available_amount: account.balance,
    cvu: account.cvu,
    alias: account.alias,
    user_id: account.userId,
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
    id: card.id,
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
