import React from 'react';
import { formatCurrency, formatDateFromString } from '../../../utils/';
import { currencies } from '../../../constants/';
import { useSearchParams } from 'react-router-dom';
import { Icon, IconType } from './../../Icon';
import { ActivityType } from '../../../common';

export enum RecordVariant {
  TRANSACTION = 'transaction',
  CARD = 'card',
  ACCOUNT = 'account',
}
interface Transaction {
  amount: number;
  name?: string;
  date: string;
  id?: string;
}

interface Card {
  number: string;
  name: string;
  type: string;
  isSelecting: boolean;
}

interface Account {
  name: string;
}
export interface RecordProps {
  content: Transaction | Card | Account;
  className?: string;
  variant?: RecordVariant;
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

function TransactionItem({ amount, name, date }: Transaction) {
  const calculatedType = calculateType(amount);
  return (
    <>
      <div className="tw-flex tw-items-center tw-gap-x-4">
        {calculatedType && (
          <Icon className="tw-fill-neutral-gray-500" type={iconType[calculatedType]} />
        )}
        <p>
          {messageType[calculatedType] && messageType[calculatedType]} {name}
        </p>
      </div>
      <div className="tw-flex tw-text-left tw-flex-col tw-items-end">
        <p>{formatCurrency(locales, currency, amount)}</p>
        <p>{formatDateFromString(date)}</p>
      </div>
    </>
  );
}

function CardItem({ number, type, isSelecting }: Card) {
  const lastFourDigits = number.slice(-4);
  return (
    <>
      <div className="tw-flex tw-items-center tw-gap-x-4">
        <Icon type="mastercard" />

        <p>
          {type} terminada en {lastFourDigits}
        </p>
      </div>
      <div className="tw-flex tw-text-left tw-gap-x-4 tw-items-center">
        <p>{isSelecting ? 'Seleccionar' : 'Eliminar'}</p>
        <p>Editar</p>
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
        <p>Editar</p>
      </div>
    </>
  );
}
