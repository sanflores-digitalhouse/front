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
  getAccount,
} from '../../utils/';
import { currencies } from '../../constants/';
import { useUserInfo } from '../../hooks/useUserInfo';
import { UserAccount } from '../../types/';

const Dashboard = () => {
  const { Argentina } = currencies;
  const { locales, currency } = Argentina;
  const navigate = useNavigate();
  const { user } = useUserInfo();
  const { id } = user;
  const [searchParams] = useSearchParams();
  const isSuccess = !!searchParams.get('success');
  const [userActivities, setUserActivities] = useState<IRecord[]>([]);
  const [userAccount, setUserAccount] = useState({
    balance: 0,
  });

  useEffect(() => {
    getUserActivities(id).then((activities) => {
      const parsedActivities = parseActivities(activities);
      const parsedRecords = parsedActivities.map((parsedActivity: any) =>
        parseRecordContent(parsedActivity, RecordVariant.TRANSACTION)
      );
      setUserActivities(parsedRecords);
    });
  }, [id]);

  useEffect(() => {
    if (id) {
      getAccount(id).then((account: UserAccount) => {
        setUserAccount({
          balance: parseFloat(account.balance),
        });
      });
    }
  }, [id]);

  return (
    <div className="tw-w-full">
      <CardCustom
        content={
          <div className="tw-flex tw-justify-between tw-mb-8">
            <div>
              <p className="tw-mb-4 tw-font-bold">Dinero disponible</p>
              <p className="tw-text-xl tw-font-bold">
                {formatCurrency(locales, currency, userAccount?.balance)}
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
