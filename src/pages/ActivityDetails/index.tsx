import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CardCustom, Icon } from '../../components/';
import { currencies, RECORD_MESSAGES, ROUTES } from '../../constants';
import { Button } from '@mui/material';
import {
  formatCurrency,
  formatDateFromString,
  getUserActivity,
  printPage,
  parseActivity,
  calculateTransacionType,
} from '../../utils';
import { Transaction, ActivityType } from '../../types';

const ActivityDetails = () => {
  const [userActivity, setUserActivity] = useState<Transaction>();
  const [activityType, setActivityType] = useState<ActivityType>(
    ActivityType.DEPOSIT
  );

  const [searchParams] = useSearchParams();
  const activityId = searchParams.get('id') || '1';
  const navigate = useNavigate();
  const { Argentina } = currencies;
  const { locales, currency } = Argentina;

  //TODO: replace with real data

  useEffect(() => {
    getUserActivity('1', activityId).then((activity: any) => {
      const parsedActivity = parseActivity(activity);
      setUserActivity(parsedActivity);
      setActivityType(
        calculateTransacionType(parsedActivity.amount, parsedActivity.type)
      );
    });
  }, [activityId]);

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
                <p>Monto</p>
                <p className="tw-text-xl tw-font-bold">
                  {userActivity &&
                    formatCurrency(
                      locales,
                      currency,
                      Math.abs(userActivity.amount)
                    )}
                </p>
              </div>
              <div className="tw-flex tw-flex-col tw-gap-y-2 tw-items-center">
                <p>
                  {RECORD_MESSAGES[activityType] &&
                    RECORD_MESSAGES[activityType]}{' '}
                </p>
                <p className="tw-text-xl tw-font-bold">
                  {userActivity && userActivity.name}
                </p>
                <i>{userActivity && formatDateFromString(userActivity.date)}</i>
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
