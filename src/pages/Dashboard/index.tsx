import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CardCustom } from '../../components/';

const Dashboard = () => {
  return (
    <div className="tw-w-full">
      <CardCustom
        content={
          <div className="tw-flex tw-justify-between tw-mb-8">
            <div>
              <p className="tw-mb-4 tw-font-bold">Dinero disponible</p>
              <p className="tw-text-xl tw-font-bold">$6.890.534,17</p>
            </div>
            <div className="tw-flex tw-justify-between tw-items-start tw-flex-wrap tw-gap-x-4">
              <Link
                className="tw-underline hover:tw-text-primary"
                to={ROUTES.HOME}
              >
                Ver tarjetas
              </Link>
              <Link
                className="tw-underline hover:tw-text-primary"
                to={ROUTES.HOME}
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
              <p className="tw-mb-4 tw-font-bold">Tu actividad</p>
            </div>
            <ul className="tw-w-full">
              <li className="tw-flex tw-w-full tw-justify-between tw-px-4 tw-border-t tw-border-neutral-blue-100 tw-py-5 hover:tw-bg-neutral-gray-500 tw-transition">
                <div className="tw-flex tw-items-center tw-gap-x-4">
                  <div className="tw-rounded-full tw-w-8 tw-h-8 tw-bg-red" />
                  <p>Transferiste a Rodrigo</p>
                </div>
                <div>
                  <p>$1.000</p>
                  <p>Sabado</p>
                </div>
              </li>
              <li className="tw-flex tw-w-full tw-justify-between tw-px-4 tw-border-t tw-border-neutral-blue-100 tw-py-5 hover:tw-bg-neutral-gray-500">
                <div className="tw-flex tw-items-center tw-gap-x-4">
                  <div className="tw-rounded-full tw-w-8 tw-h-8 tw-bg-red" />
                  <p>Transferiste a Rodrigo</p>
                </div>
                <div>
                  <p>$1.000</p>
                  <p>Sabado</p>
                </div>
              </li>
            </ul>
          </>
        }
        actions={
          <Link
            to={ROUTES.HOME}
            className="tw-h-12 tw-w-full tw-flex tw-items-center tw-justify-between tw-px-4 hover:tw-text-primary hover:tw-bg-neutral-gray-500 tw-transition"
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
