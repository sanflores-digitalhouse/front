import React from 'react';
import {
  formatCurrency,
  formatDateFromString,
  isVisa,
  isMastercard,
  deleteUserCard,
} from '../../../utils/';
import { currencies, ROUTES, ID } from '../../../constants/';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Icon, IconType } from './../../Icon';
import { ActivityType } from '../../../common';

export enum RecordVariant {
  TRANSACTION = 'transaction',
  CARD = 'card',
  ACCOUNT = 'account',
}
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
  isSelecting?: boolean;
}

interface Account {
  name: string;
}

export interface IRecord {
  content: Transaction | Card | Account;
  variant?: RecordVariant;
}

export interface RecordProps extends IRecord {
  className?: string;
}
const { Argentina } = currencies;
const { locales, currency } = Argentina;

const iconType: Record<ActivityType, IconType> = {
  [ActivityType.TRANSFER_IN]: 'transfer-in',
  [ActivityType.TRANSFER_OUT]: 'transfer-out',
  [ActivityType.INCOME]: 'income',
};
const messageType: Record<ActivityType, string> = {
  [ActivityType.TRANSFER_IN]: 'Recibiste de',
  [ActivityType.TRANSFER_OUT]: 'Enviaste a',
  [ActivityType.INCOME]: 'Ingresaste',
};

export const calculateType = (amount: number) => {
  const isNegative = amount < 0;
  return isNegative ? ActivityType.TRANSFER_OUT : ActivityType.TRANSFER_IN;
};

export const Record = ({
  className,
  content,
  variant = RecordVariant.TRANSACTION,
}: RecordProps) => {
  const [searchParams] = useSearchParams();
  const isSelecting = !!searchParams.get('select');

  return (
    <li
      className={`tw-flex tw-w-full tw-justify-between tw-px-4 tw-border-t tw-border-neutral-blue-100 tw-py-5 hover:tw-bg-neutral-gray-500 tw-transition ${className}`}
    >
      {variant === RecordVariant.TRANSACTION && (
        <TransactionItem {...(content as Transaction)} />
      )}
      {variant === RecordVariant.CARD && (
        <CardItem {...(content as Card)} isSelecting={isSelecting} />
      )}
      {variant === RecordVariant.ACCOUNT && (
        <AccountItem {...(content as Account)} />
      )}
    </li>
  );
};

function TransactionItem({ amount, name, date, id }: Transaction) {
  const calculatedType = calculateType(amount);
  return (
    <Link
      className="tw-w-full tw-flex tw-justify-between tw-items-center"
      to={`${ROUTES.ACTIVITY_DETAILS}?${ID}${id}`}
    >
      <div className="tw-flex tw-items-center tw-gap-x-4">
        {calculatedType && (
          <Icon
            className="tw-fill-neutral-gray-500"
            type={iconType[calculatedType]}
          />
        )}
        <p>
          {messageType[calculatedType] && messageType[calculatedType]} {name}
        </p>
      </div>
      <div className="tw-flex tw-text-left tw-flex-col tw-items-end">
        <p>{formatCurrency(locales, currency, amount)}</p>
        <p>{formatDateFromString(date)}</p>
      </div>
    </Link>
  );
}

function CardItem({ number, type, isSelecting, id }: Card) {
  const navigate = useNavigate();
  const lastFourDigits = number.slice(-4);
  const isVisaCard = isVisa(number);
  const isMasterCard = isMastercard(number);
  const cardType = isVisaCard
    ? 'visa'
    : isMasterCard
    ? 'mastercard'
    : 'credit-card';
  return (
    <>
      <div className="tw-flex tw-items-center tw-gap-x-4">
        <Icon type={cardType} />

        <p>
          {type} terminada en {lastFourDigits}
        </p>
      </div>
      <div className="tw-flex tw-text-left tw-gap-x-4 tw-items-center">
        {isSelecting ? (
          <button
            onClick={() =>
              navigate(
                `${ROUTES.LOAD_MONEY}?type=${cardType}&card=${lastFourDigits}`
              )
            }
          >
            Seleccionar
          </button>
        ) : (
          <button onClick={() => deleteUserCard('1', id)}>Eliminar</button>
        )}
      </div>
    </>
  );
}

function AccountItem({ name }: Account) {
  return (
    <>
      <div className="tw-flex tw-items-center tw-gap-x-4">
        <Icon type="user" />
        <p>{name}</p>
      </div>
      <div className="tw-flex tw-text-left tw-gap-x-4 tw-items-center">
        <p>Seleccionar</p>
      </div>
    </>
  );
}
