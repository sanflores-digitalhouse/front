import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import {
  CardCustom,
  Records,
  RecordVariant,
  Icon,
  SnackBar,
  IRecord,
  Skeleton,
  SkeletonVariant,
} from '../../components';
import {
  formatCurrency,
  getUserActivities,
  parseActivities,
  parseRecordContent,
} from '../../utils/';
import { currencies } from '../../constants/';
import { useUserInfo } from '../../hooks/useUserInfo';

const newUser = {
  name: 'Mauricio',
  lastName: 'Garcia',
  email: 'mauricio@gmail.com',
  password: '123456N"',
  phone: '1234567890',
  balance: 100000,
  account: {
    activities: [
      {
        sourceAccount: '1234567890',
        amount: 100000,
        date: '2021-10-10',
      },
    ],
    cards: [
      {
        number: '1234567890',
        name: 'Mauricio Garcia',
        expiration: '10/2025',
        cvc: '123',
      },
    ],
    accounts: [
      {
        name: 'Mauricio Garcia',
      },
    ],
  },
};

const Dashboard = () => {
  const { Argentina } = currencies;
  const { locales, currency } = Argentina;
  const navigate = useNavigate();
  const { dispatch } = useUserInfo();
  const [searchParams] = useSearchParams();
  const isSuccess = !!searchParams.get('success');
  const [userActivities, setUserActivities] = useState<IRecord[]>([]);

  useEffect(() => {
    getUserActivities('12312312312').then((activities) => {
      const parsedActivities = parseActivities(activities);
      const parsedRecords = parsedActivities.map((parsedActivity: any) =>
        parseRecordContent(parsedActivity, RecordVariant.TRANSACTION)
      );
      setUserActivities(parsedRecords);
    });
  }, []);

  useEffect(() => {
    dispatch({ type: 'SET_USER', payload: newUser });
  }, [dispatch]);

  return (
    <div className="tw-w-full">
      <CardCustom
        content={
          <div className="tw-flex tw-justify-between tw-mb-8">
            <div>
              <p className="tw-mb-4 tw-font-bold">Dinero disponible</p>
              <p className="tw-text-xl tw-font-bold">
                {formatCurrency(locales, currency, 6890534.17)}
              </p>
            </div>
            <div className="tw-flex tw-justify-between tw-items-start tw-flex-wrap tw-gap-x-4">
              <Link
                className="tw-underline hover:tw-text-primary"
                to={ROUTES.CARDS}
              >
                Ver tarjetas
              </Link>
              <Link
                className="tw-underline hover:tw-text-primary"
                to={ROUTES.PROFILE}
              >
                Ver CVU
              </Link>
            </div>
          </div>
        }
        actions={
          <>
            <Button
              onClick={() => navigate(ROUTES.LOAD_MONEY)}
              className="tw-h-12 tw-w-64"
              variant="outlined"
            >
              Ingresar dinero
            </Button>
            <Button
              onClick={() => navigate(ROUTES.SEND_MONEY)}
              className="tw-h-12 tw-w-64"
              variant="contained"
            >
              Transferir dinero
            </Button>
          </>
        }
      />

      <CardCustom
        content={
          <>
            <div>
              <p className="tw-mb-4 tw-font-bold">Tu actividad reciente</p>
            </div>
            {userActivities.length > 0 ? (
              <Records records={userActivities} maxRecords={5} />
            ) : (
              <Skeleton
                variant={SkeletonVariant.RECORD_LIST}
                numberOfItems={5}
              />
            )}
          </>
        }
        actions={
          <Link
            to={ROUTES.ACTIVITY}
            className="tw-h-12 tw-w-full tw-flex tw-items-center tw-justify-between tw-mt-4 hover:tw-text-primary tw-px-4 hover:tw-bg-neutral-gray-500 tw-transition"
          >
            <span>Ver toda tu actividad</span>
            <Icon type="arrow-right" />
          </Link>
        }
      />
      {isSuccess && (
        <SnackBar
          duration={3000}
          message="El dinero fue ingresado correctamente"
          type="success"
        />
      )}
    </div>
  );
};

export default Dashboard;
