import React, { useState, useEffect, useCallback } from 'react';
import {
  CardCustom,
  Icon,
  Records,
  FormSingle,
  IRecord,
  RecordVariant,
  SnackBar,
  TransactionRecord,
} from '../../components';
import { currencies, ERROR, ROUTES, STEP, UNAUTHORIZED } from '../../constants';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  handleChange,
  moneyValidationConfig,
  formatCurrency,
  getUserActivities,
  parseRecordContent,
  calculateTransacionType,
  getAccounts,
  getUser,
  parseTransactionResponseInfo,
  parseAccountResponseInfo,
} from '../../utils';
import { Button } from '@mui/material';
import {
  ActivityType,
  Transaction,
  TransactionType,
  UserAccount,
  User,
} from '../../types';
import { useAuth, useLocalStorage, useUserInfo } from '../../hooks';

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const [userActivities, setUserActivities] = useState<Transaction[]>([]);
  const [userAccounts, setUserAccounts] = useState<IRecord[]>([]);
  const { logout } = useAuth();
  const { user } = useUserInfo();
  const { account } = user as User;
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (user && account && !step) {
      getUserActivities(account.id, token)
        .then((activities) => {
          const parsedActivities = activities.map((activity) =>
            parseTransactionResponseInfo(activity)
          );
          if ((parsedActivities as Transaction[]).length > 0) {
            const transferActivities = parsedActivities.filter(
              (activity: Transaction) =>
                activity.type === TransactionType.Transfer
            );
            setUserActivities(transferActivities);
          }
        })
        .catch((error) => {
          if (error.status === UNAUTHORIZED) {
            logout();
          }
        });
    }
  }, [account, logout, step, token, user]);

  useEffect(() => {
    if (userActivities.length > 0) {
      const parsedRecords = userActivities
        .filter(
          (activity: Transaction) =>
            calculateTransacionType(activity.amount, activity.type) ===
            ActivityType.TRANSFER_IN
        )
        .map((activity: Transaction) =>
          parseRecordContent({ origin: activity.origin }, RecordVariant.ACCOUNT)
        );

      const uniqueRecords = parsedRecords.filter(
        (record, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              (t.content as TransactionRecord).origin ===
              (record.content as TransactionRecord).origin
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

const duration = 2000;

function SendMoneyForm() {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get('destination')
  );
  const step = searchParams.get('step');
  const [formState, setFormState] = useState({
    destination: destination || '',
    amount: '',
  });
  const [userDestinationAccount, setUserDestinationAccount] =
    useState<UserAccount>();
  const [userDestination, setUserDestination] = useState<any>();
  const [userOriginAccount, setUserOriginAccount] = useState<UserAccount>();
  const navigate = useNavigate();
  const { user } = useUserInfo();
  const { account } = user as User;
  // const [token] = useLocalStorage('token');

  useEffect(() => {
    if (destination) {
      // TODO: implement a service to get user account by alias or cvu
      getAccounts().then((accounts) => {
        const userAccount = accounts.find(
          (account) =>
            account.cvu === destination || account.alias === destination
        );
        if (userAccount) {
          setUserDestinationAccount(parseAccountResponseInfo(userAccount));
        } else {
          setDestination(null);
          navigate(`${ROUTES.SEND_MONEY}?${STEP}1&${ERROR}`);
        }
      });
    }
  }, [destination, navigate]);

  useEffect(() => {
    if (userDestinationAccount) {
      const { userId } = userDestinationAccount;
      getUser(userId).then((user) => {
        setUserDestination(user);
      });
    }
  }, [navigate, userDestinationAccount]);

  useEffect(() => {
    if (user && account) {
      getAccounts().then((accounts) => {
        const parseAccounts = accounts.map((account) =>
          parseAccountResponseInfo(account)
        );
        const userAccount = parseAccounts.find(
          (account) => account.userId === account.id
        );
        if (userAccount) {
          setUserOriginAccount(userAccount);
        }
      });
    }
  }, [account, user]);

  const onNavigate = useCallback(
    (step: number) => {
      navigate(`${ROUTES.SEND_MONEY}?${STEP}${step}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (step !== '1' && formState.destination === '') {
      setTimeout(() => onNavigate(1));
    }
  }, [step, formState, navigate, onNavigate]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    maxLength?: number
  ) => handleChange(event, setFormState, maxLength);

  return <>{renderStep(formState)}</>;

  function renderStep(formState: { destination: string; amount: string }) {
    const { amount } = formState;
    const { Argentina } = currencies;
    const { locales, currency } = Argentina;
    const isError = !!searchParams.get('error');

    const handleClick = (
      origin: string,
      destination: string,
      amount: number
    ) => {
      // TODO: implement a service to create a transaction
      // const destinationName = userDestinationAccount
      //   ? userDestinationAccount.name
      //   : '';
      // if (user && account) {
      //   createTransferActivity(
      //     account.id,
      //     token,
      //     origin,
      //     destination,
      //     amount,
      //     destinationName
      //   ).then((response) => {
      //     navigate(`${ROUTES.ACTIVITY_DETAILS}?${STEP}${response.id}`);
      //   });
      // }
      console.log(origin, destination, amount);
    };

    switch (step) {
      case '1':
        return (
          <>
            <FormSingle
              name="destination"
              title="Agregá una nueva cuenta"
              label="CVU ó Alias"
              type="text"
              actionLabel="Continuar"
              formState={formState}
              handleChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => onChange(event)}
              submit={() => {
                if (formState.destination) {
                  setDestination(formState.destination);
                  onNavigate(2);
                }
              }}
            />
            {isError && (
              <SnackBar
                duration={duration}
                message="Cuenta no encontrada"
                type="error"
              />
            )}
          </>
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
                    <p className="tw-font-bold">CVU: {formState.destination}</p>
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
