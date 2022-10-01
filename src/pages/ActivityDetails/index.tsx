import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CardCustom, Icon } from '../../components/';
import { currencies, ROUTES } from '../../constants';
import { Button } from '@mui/material';
import { formatCurrency, formatDateFromString, printPage } from '../../utils';

const ActivityDetails = () => {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id') || '0', 10);
  const navigate = useNavigate();
  const { Argentina } = currencies;
  const { locales, currency } = Argentina;
  console.log(id);

  //TODO: replace with real date

  return (
    <div>
      <CardCustom
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-max-w-5xl print:tw-border-none print:tw-w-screen print:tw-h-screen print:!tw-mt-0"
        content={
          <div className="tw-border-neutral-blue-100 tw-rounded-lg print:tw-border-2 print:tw-p-48">
            <Icon
              className="tw-text-primary tw-mx-auto tw-mb-8 tw-hidden print:tw-block"
              type="digital-house"
            />
            <div className="tw-flex tw-flex-col tw-gap-y-6 tw-justify-center tw-mb-8 print:tw-mb-0">
              <div className="tw-flex tw-flex-col tw-gap-y-2 tw-items-center">
                <p>Monto transferido</p>
                <p className="tw-text-xl tw-font-bold">
                  {formatCurrency(locales, currency, 300)}
                </p>
              </div>
              <div className="tw-flex tw-flex-col tw-gap-y-2 tw-items-center">
                <p>Tranferido a</p>
                <p className="tw-text-xl tw-font-bold">Juan Perez</p>
                <i>{formatDateFromString('2022-09-17T20:57:38+00:00')}</i>
              </div>
            </div>
          </div>
        }
        actions={
          <div className="tw-flex tw-flex-col tw-justify-center tw-gap-y-8">
            <Button
              onClick={printPage}
              className="tw-h-12 tw-w-64 print:tw-hidden"
              variant="outlined"
            >
              Imprimir
            </Button>
            <Button
              onClick={() => navigate(ROUTES.HOME)}
              className="tw-h-12 tw-w-64 print:tw-hidden"
              variant="contained"
            >
              Continuar
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default ActivityDetails;
