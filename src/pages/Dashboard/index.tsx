import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CardCustom, Records, RecordVariant } from '../../components';
import { formatCurrency } from '../../utils/';
import { currencies } from '../../constants/';
import { USER } from '../../data';

const { activities } = USER;
const parsedActivities = activities.map((activity) => {
  const { amount, name, date, type } = activity;
  return {
    content: {
      amount,
      name,
      date,
      type,
    },
    variant: RecordVariant.TRANSACTION,
  };
});

const Dashboard = () => {
  const { Argentina } = currencies;
  const { locales, currency } = Argentina;
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
            <Button className="tw-h-12 tw-w-64" variant="outlined">
              Ingresar dinero
            </Button>
            <Button className="tw-h-12 tw-w-64" variant="contained">
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
            <Records records={parsedActivities} maxRecords={5} />
          </>
        }
        actions={
          <Link
            to={ROUTES.ACTIVITY}
            className="tw-h-12 tw-w-full tw-flex tw-items-center tw-justify-between tw-px-4 tw-mt-4 hover:tw-text-primary hover:tw-bg-neutral-gray-500 tw-transition"
          >
            <span>Ver toda tu actividad</span>
            <ArrowForwardIosIcon />
          </Link>
        }
      />
    </div>
  );
};

export default Dashboard;
