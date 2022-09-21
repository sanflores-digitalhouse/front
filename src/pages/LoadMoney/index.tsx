import React from 'react';
import { Link } from 'react-router-dom';
import { CardCustom, Icon } from '../../components';
import { ROUTES, SELECT } from '../../constants';

const LoadMoney = () => {
  return (
    <div className="tw-w-full">
      <CardCustom
        className="tw-max-w-5xl"
        content={
          <div className="tw-flex tw-justify-between tw-mb-4">
            <p className="tw-font-bold">Desde cuenta propia</p>
          </div>
        }
        actions={
          <Link
            to={ROUTES.PROFILE}
            className="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-4 hover:tw-bg-neutral-gray-500 tw-transition"
          >
            <div className="tw-flex tw-items-center tw-gap-x-4">
              <Icon type="user" />
              <p>Transferencia bancaria</p>
            </div>
            <Icon type="arrow-right" />
          </Link>
        }
      />
      <CardCustom
        className="tw-max-w-5xl"
        content={
          <div className="tw-flex tw-justify-between tw-mb-4">
            <p className="tw-font-bold">Desde tarjeta</p>
          </div>
        }
        actions={
          <Link
            to={`${ROUTES.CARDS}?${SELECT}`}
            className="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-4 hover:tw-bg-neutral-gray-500 tw-transition"
          >
            <div className="tw-flex tw-items-center tw-gap-x-4">
              <Icon type="credit-card" />
              <p>Seleccionar tarjeta</p>
            </div>
            <Icon type="arrow-right" />
          </Link>
        }
      />
    </div>
  );
};

export default LoadMoney;
