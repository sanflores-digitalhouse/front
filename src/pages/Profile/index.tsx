import React from 'react';
import { CardCustom, Tooltip, TooltipPosition, Icon } from '../../components';

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
            <div className="tw-flex tw-mb-4 tw-justify-between tw-items-center">
              <div>
                <p className="tw-font-bold tw-text-primary">CVU</p>
                <p className="">0000002100075320000000</p>
              </div>
              <Tooltip className="tw-cursor-pointer" message="Copiado" position={TooltipPosition.top}>
                <Icon type="copy" />
              </Tooltip>
            </div>
            <div className="tw-flex tw-justify-between tw-items-center">
              <div>
                <p className="tw-font-bold tw-text-primary">Alias</p>
                <p className="">estealiasnoexiste</p>
              </div>
              <Tooltip className="tw-cursor-pointer" message="Copiado" position={TooltipPosition.top}>
                <Icon type="copy" />
              </Tooltip>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Profile;
