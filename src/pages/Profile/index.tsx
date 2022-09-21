import React from 'react';
import { CardCustom, Tooltip, TooltipPosition } from '../../components';

const Profile = () => {
  return (
    <div className="tw-w-full">
      <CardCustom
        className="tw-max-w-5xl"
        content={
          <div className="tw-flex tw-gap-4 tw-flex-col tw-w-full">
            <p className="tw-font-bold">
              Copia tu cvu o alias para ingresar o transferir dinero desde otra
              cuenta
            </p>
            <div className="tw-flex tw-justify-between tw-items-center">
              <div>
                <p className="tw-mb-4">CVU</p>
                <p className="">00000</p>
              </div>
              <Tooltip message="Copiado" position={TooltipPosition.top}>
                <div className="tw-rounded-full tw-w-8 tw-h-8 tw-bg-red" />
              </Tooltip>
            </div>
            <div className="tw-flex tw-justify-between tw-items-center">
              <div>
                <p className="tw-mb-4">Alias</p>
                <p className="">estealiasnoexiste</p>
              </div>
              <Tooltip message="Copiado" position={TooltipPosition.top}>
                <div className="tw-rounded-full tw-w-8 tw-h-8 tw-bg-red" />
              </Tooltip>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Profile;
