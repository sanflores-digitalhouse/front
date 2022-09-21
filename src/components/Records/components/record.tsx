import React from 'react';
import { formatCurrency, formatDateFromString } from '../../../utils/';
import { currencies } from '../../../constants/';
import { useSearchParams } from 'react-router-dom';

export enum RecordVariant {
  TRANSACTION = 'transaction',
  CARD = 'card',
  ACCOUNT = 'account',
}
interface Transaction {
  amount: number;
  name: string;
  date: string;
  type: string;
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
        <Transaction {...(content as Transaction)} />
      )}
      {variant === RecordVariant.CARD && (
        <CardItem {...(content as Card)} isSelecting={isSelecting} />
      )}
    </li>
  );
};

function Transaction({ amount, name, date, type }: Transaction) {
  return (
    <>
      <div className="tw-flex tw-items-center tw-gap-x-4">
        <div className="tw-rounded-full tw-w-8 tw-h-8 tw-bg-red" />
        <p>
          {type} a {name}
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
        <div className="tw-rounded-full tw-w-8 tw-h-8 tw-bg-red" />
        <p>
          {type} terminada en {lastFourDigits}
        </p>
      </div>
      <div className="tw-flex tw-text-left tw-gap-x-4 tw-items-center">
        <p>{isSelecting ?  'Seleccionar': 'Eliminar'}</p>
        <p>Editar</p>
      </div>
    </>
  );
}
