import React, { useState, useEffect, useCallback } from 'react';
import {
  CardCustom,
  Icon,
  Records,
  FormSingle,
  IRecord,
  RecordVariant,
} from '../../components';
import { currencies, ROUTES, STEP } from '../../constants';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  handleChange,
  moneyValidationConfig,
  aliasValidationConfig,
  formatCurrency,
  getUserActivities,
  parseRecordContent,
  calculateTransacionType,
  getAccounts,
  getUser,
  createTransferActivity,
} from '../../utils';
import { Button } from '@mui/material';
import {
  ActivityType,
  Transaction,
  TransactionType,
  UserAccount,
  User,
} from '../../types';
import { useLocalStorage, useUserInfo } from '../../hooks';

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const [userActivities, setUserActivities] = useState<Transaction[]>([]);
  const [userAccounts, setUserAccounts] = useState<IRecord[]>([]);
  const { user } = useUserInfo();
  const { id } = user;
  const [token, setToken] = useLocalStorage('token');

  useEffect(() => {
    getUserActivities(id, token).then((activities) => {
      if ((activities as Response).status === 401) {
        setToken(null);
      }
      if ((activities as Transaction[]).length > 0) {
        const parsedActivities = (activities as Transaction[]).filter(
          (activity: Transaction) => activity.type === TransactionType.Transfer
        );
        setUserActivities(parsedActivities);
      }
    });
  }, [id, setToken, token]);

  useEffect(() => {
    if (userActivities.length > 0) {
      const parsedRecords = userActivities
        .filter(
          (activity: Transaction) =>
            calculateTransacionType(activity.amount, activity.type) ===
            ActivityType.TRANSFER_IN
        )
        .map((activity: Transaction) =>
          parseRecordContent(
            { name: activity.name, origin: activity.origin },
            RecordVariant.ACCOUNT
          )
        );

      const uniqueRecords = parsedRecords.filter(
        (record, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              (t.content as Transaction).origin ===
              (record.content as Transaction).origin
          )
      );

      setUserAccounts(uniqueRecords);
    }
  }, [userActivities]);

  return (
    <div className="tw-w-full">
      {step ? (
        <SendMoneyForm />
      ) : (
        <>
          <CardCustom
            className="tw-max-w-5xl"
            content={
              <div className="tw-flex tw-justify-between tw-mb-4">
                <p className="tw-font-bold">Elegí a qué cuenta transferir</p>
              </div>
            }
            actions={
              <Link
                to={`${ROUTES.SEND_MONEY}?${STEP}1`}
                className="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-4 hover:tw-bg-neutral-gray-500 tw-transition"
              >
                <div className="tw-flex tw-items-center tw-gap-x-4">
                  <Icon type="add" />
                  <p>Nueva cuenta</p>
                </div>
                <Icon type="arrow-right" />
              </Link>
            }
          />
          <CardCustom
            className="tw-max-w-5xl"
            content={
              <>
                <div>
                  <p className="tw-mb-4 tw-font-bold">Últimas cuentas</p>
                </div>
                {userAccounts.length > 0 && <Records records={userAccounts} />}
                {userAccounts.length === 0 && <p>No hay cuentas registradas</p>}
              </>
            }
          />
        </>
      )}
    </div>
  );
};

export default SendMoney;

function SendMoneyForm() {
  const [searchParams] = useSearchParams();
  const cvu = searchParams.get('cvu');
  const step = searchParams.get('step');
  const [formState, setFormState] = useState({
    alias: cvu || '',
    amount: '',
  });
  const [userDestinationAccount, setUserDestinationAccount] =
    useState<UserAccount>();
  const [userDestination, setUserDestination] = useState<User>();
  const [userOriginAccount, setUserOriginAccount] = useState<UserAccount>();
  const navigate = useNavigate();
  const { user } = useUserInfo();
  const { id } = user;

  useEffect(() => {
    getAccounts().then((accounts) => {
      const userAccount = accounts.find((account) => account.cvu === cvu);
      if (userAccount) {
        setUserDestinationAccount(userAccount);
      }
    });
  }, [cvu]);

  useEffect(() => {
    if (userDestinationAccount) {
      const { userId } = userDestinationAccount;
      getUser(userId).then((user) => {
        setUserDestination(user);
      });
    }
  }, [userDestinationAccount]);

  useEffect(() => {
    if (id) {
      getAccounts().then((accounts) => {
        const userAccount = accounts.find((account) => account.userId === id);
        if (userAccount) {
          setUserOriginAccount(userAccount);
        }
      });
    }
  }, [id]);

  const onNavigate = useCallback(
    (step: number) => {
      navigate(`${ROUTES.SEND_MONEY}?${STEP}${step}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (step !== '1' && formState.alias === '') {
      setTimeout(() => onNavigate(1));
    }
  }, [step, formState, navigate, onNavigate]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    maxLength?: number
  ) => handleChange(event, setFormState, maxLength);

  return <>{renderStep(formState)}</>;

  function renderStep(formState: { alias: string; amount: string }) {
    const { amount } = formState;
    const { Argentina } = currencies;
    const { locales, currency } = Argentina;

    const handleClick = (
      userId: string,
      origin: string,
      destination: string,
      amount: number
    ) => {
      createTransferActivity(userId, origin, destination, amount);
    };

    switch (step) {
      case '1':
        return (
          <FormSingle
            name="alias"
            title="Agregá una nueva cuenta"
            label="CVU ó Alias"
            type="text"
            actionLabel="Continuar"
            validation={aliasValidationConfig}
            formState={formState}
            handleChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(event)}
            submit={() => onNavigate(2)}
          />
        );
      case '2':
        return (
          <FormSingle
            name="amount"
            title={`¿Cuanto quieres transferir a ${
              userDestination && userDestination.firstName
            } ?`}
            label="Monto"
            type="number"
            actionLabel="Continuar"
            validation={moneyValidationConfig}
            formState={formState}
            handleChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(event)}
            submit={() => onNavigate(3)}
          />
        );
      case '3':
        return (
          <>
            <CardCustom
              content={
                <div className="tw-flex tw-flex-col">
                  <div className="tw-flex tw-justify-between tw-mb-4">
                    <p className="tw-font-bold">Revisá que está todo bien</p>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mb-4">
                    <div className="tw-flex tw-gap-2">
                      <p className="">Vas a transferir</p>
                      <Link to={`${ROUTES.SEND_MONEY}?${STEP}2`}>
                        <Icon type="edit" />
                      </Link>
                    </div>
                    <p className="tw-font-bold">
                      {formatCurrency(locales, currency, parseFloat(amount))}
                    </p>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mb-4">
                    <p className="">Para</p>
                    <p className="tw-font-bold">
                      {userDestination &&
                        `${userDestination.firstName} ${userDestination.lastName}`}
                    </p>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mb-4">
                    <p className="tw-font-bold">CVU: {formState.alias}</p>
                  </div>
                </div>
              }
              actions={
                <div className="tw-flex tw-w-full tw-justify-end tw-mt-6">
                  <Button
                    type="submit"
                    className="tw-h-12 tw-w-64"
                    variant="outlined"
                    onClick={() =>
                      handleClick(
                        id,
                        userOriginAccount?.cvu || '',
                        userDestinationAccount?.cvu || '',
                        parseFloat(amount)
                      )
                    }
                  >
                    Transferir
                  </Button>
                </div>
              }
            />
          </>
        );
    }
  }
}
