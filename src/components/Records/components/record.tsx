import React from 'react';
import {
  formatCurrency,
  formatDateFromString,
  isVisa,
  isMastercard,
  deleteUserCard,
  calculateTransacionType,
} from '../../../utils/';
import {
  currencies,
  ROUTES,
  ID,
  SUCCESS,
  MESSAGE,
  SUCCESS_MESSAGES_KEYS,
  RECORD_MESSAGES,
  STEP,
  DESTINATION,
  UNAUTHORIZED,
} from '../../../constants/';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Icon, IconType } from './../../Icon';
import { ActivityType, TransactionType, User } from '../../../types';
import { useAuth, useLocalStorage, useUserInfo } from '../../../hooks';

export interface TransactionRecord {
  amount: number;
  name?: string;
  dated: string;
  id: string;
  type: TransactionType;
  origin?: string;
  destination?: string;
}

export interface CardRecord {
  number: string;
  name: string;
  type: string;
  id: string;
}

export interface AccountRecord {
  name: string;
  origin: string;
}

export enum RecordVariant {
  TRANSACTION = 'transaction',
  CARD = 'card',
  ACCOUNT = 'account',
}

export interface IRecord {
  content: TransactionRecord | CardRecord | AccountRecord;
  variant?: RecordVariant;
}

export interface RecordProps extends IRecord {
  className?: string;
  setRecords?: React.Dispatch<React.SetStateAction<IRecord[]>>;
}
const { Argentina } = currencies;
const { locales, currency } = Argentina;

const iconType: Record<ActivityType, IconType> = {
  [ActivityType.TRANSFER_IN]: 'transfer-in',
  [ActivityType.TRANSFER_OUT]: 'transfer-out',
  [ActivityType.DEPOSIT]: 'deposit',
};

export const Record = ({
  className,
  content,
  variant = RecordVariant.TRANSACTION,
  setRecords,
}: RecordProps) => {
  const [searchParams] = useSearchParams();
  const isSelecting = !!searchParams.get('select');

  return (
    <li
      className={`tw-flex tw-w-full tw-justify-between tw-px-4 tw-border-t tw-border-neutral-blue-100 tw-py-5 hover:tw-bg-neutral-gray-500 tw-transition ${className}`}
    >
      {variant === RecordVariant.TRANSACTION && (
        <TransactionItem {...(content as TransactionRecord)} />
      )}
      {variant === RecordVariant.CARD && (
        <CardItem
          {...(content as CardRecord)}
          setRecords={setRecords}
          isSelecting={isSelecting}
        />
      )}
      {variant === RecordVariant.ACCOUNT && (
        <AccountItem {...(content as AccountRecord)} />
      )}
    </li>
  );
};

function TransactionItem({ amount, name, dated, id, type }: TransactionRecord) {
  const calculatedType = calculateTransacionType(amount, type);
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
          {RECORD_MESSAGES[calculatedType] && RECORD_MESSAGES[calculatedType]}{' '}
          {name}
        </p>
      </div>
      <div className="tw-flex tw-text-left tw-flex-col tw-items-end">
        <p>{formatCurrency(locales, currency, amount)}</p>
        <p>{formatDateFromString(dated)}</p>
      </div>
    </Link>
  );
}

function CardItem({
  number,
  type,
  isSelecting,
  id: cardId,
  setRecords,
}: CardRecord & {
  setRecords?: React.Dispatch<React.SetStateAction<IRecord[]>>;
  isSelecting: boolean;
}) {
  const navigate = useNavigate();
  const lastFourDigits = (number && number.slice(-4)) || '';
  const isVisaCard = isVisa(number);
  const isMasterCard = isMastercard(number);
  const cardType = isVisaCard
    ? 'visa'
    : isMasterCard
    ? 'mastercard'
    : 'credit-card';
  const { user } = useUserInfo();
  const { logout } = useAuth();
  const [token] = useLocalStorage('token');

  const handleDelete = () => {
    if (user) {
      const { account } = user as User;
      deleteUserCard(account.id, cardId, token)
        .then(() => {
          setRecords &&
            setRecords((prev) =>
              prev.filter(
                (record) => (record.content as CardRecord).id !== cardId
              )
            );
          setTimeout(
            () =>
              navigate(
                `${ROUTES.CARDS}?${SUCCESS}&${MESSAGE}${SUCCESS_MESSAGES_KEYS.CARD_DELETED}`
              ),
            1000
          );
        })
        .catch((error) => {
          if (error.status === UNAUTHORIZED) {
            logout();
          }
        });
    }
  };

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
            className="tw-text-primary"
          >
            Seleccionar
          </button>
        ) : (
          <button className="tw-text-error" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </div>
    </>
  );
}

function AccountItem({ name, origin }: AccountRecord) {
  const navigate = useNavigate();

  return (
    <>
      <div className="tw-flex tw-items-center tw-gap-x-4">
        <Icon type="user" />
        <p>{name}</p>
      </div>
      <div className="tw-flex tw-text-primary tw-text-left tw-gap-x-4 tw-items-center">
        <button
          onClick={() =>
            navigate(`${ROUTES.SEND_MONEY}?${STEP}2&${DESTINATION}${origin}`)
          }
        >
          Seleccionar
        </button>
      </div>
    </>
  );
}
