import React from 'react';
import { Link } from 'react-router-dom';
import { CardCustom, Icon } from '../../components';
import { ROUTES, SELECT } from '../../constants';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const LoadMoney = () => {
  return (
    <div className="tw-w-full">
      <CardCustom
        className="tw-max-w-5xl"
        content={
          <div className="tw-flex tw-justify-between tw-mb-8">
            <p className="tw-font-bold">Desde cuenta propia</p>
          </div>
        }
        actions={
          <Link
            to={ROUTES.HOME}
            className="tw-w-full tw-flex tw-items-center tw-justify-between"
          >
            <div className="tw-flex tw-items-center tw-gap-x-4">
              <Icon type="user" />
              <p>Transferencia bancaria</p>
            </div>
            <ArrowForwardIosIcon />
          </Link>
        }
      />
      <CardCustom
        className="tw-max-w-5xl"
        content={
          <div className="tw-flex tw-justify-between tw-mb-8">
            <p className="tw-font-bold">Desde tarjeta</p>
          </div>
        }
        actions={
          <Link
            to={`${ROUTES.CARDS}?${SELECT}`}
            className="tw-w-full tw-flex tw-items-center tw-justify-between"
          >
            <div className="tw-flex tw-items-center tw-gap-x-4">
              <Icon type="credit-card" />
              <p>Seleccionar tarjeta</p>
            </div>
            <ArrowForwardIosIcon />
          </Link>
        }
      />
    </div>
  );
};

export default LoadMoney;
