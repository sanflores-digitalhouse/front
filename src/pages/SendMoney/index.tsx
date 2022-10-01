import React, { useState, useEffect } from 'react';
import {
  CardCustom,
  Icon,
  Records,
  RecordVariant,
  FormSingle,
} from '../../components';
import { currencies, ROUTES, STEP } from '../../constants';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { USER } from '../../data/user';
import {
  handleChange,
  moneyValidationConfig,
  aliasValidationConfig,
  formatCurrency,
} from '../../utils';
import { Button } from '@mui/material';

const { account } = USER;
const { accounts } = account;
const userAccounts = accounts.map((account) => {
  const { name } = account;
  return {
    content: {
      name,
    },
    variant: RecordVariant.ACCOUNT,
  };
});

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');

  return (
    <div className="tw-w-full">
      {step ? (
        <SendMoneyForm />
      ) : (
        <>
          <CardCustom
            className="tw-max-w-5xl"
            content={
              <div className="tw-flex tw-justify-between tw-mb-4">
                <p className="tw-font-bold">Elegí a qué cuenta transferir</p>
              </div>
            }
            actions={
              <Link
                to={`${ROUTES.SEND_MONEY}?${STEP}1`}
                className="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-4 hover:tw-bg-neutral-gray-500 tw-transition"
              >
                <div className="tw-flex tw-items-center tw-gap-x-4">
                  <Icon type="add" />
                  <p>Nueva cuenta</p>
                </div>
                <Icon type="arrow-right" />
              </Link>
            }
          />
          <CardCustom
            className="tw-max-w-5xl"
            content={
              <>
                <div>
                  <p className="tw-mb-4 tw-font-bold">Últimas cuentas</p>
                </div>
                <Records records={userAccounts} />
              </>
            }
          />
        </>
      )}
    </div>
  );
};

export default SendMoney;

function SendMoneyForm() {
  const [formState, setFormState] = useState({
    alias: '',
    amount: '',
  });
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const navigate = useNavigate();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    maxLength?: number
  ) => handleChange(event, setFormState, maxLength);

  const onNavigate = (step: number) => {
    navigate(`${ROUTES.SEND_MONEY}?${STEP}${step}`);
  };

  useEffect(() => {
    if (step !== '1' && formState.alias === '') {
      setTimeout(() => navigate(`${ROUTES.SEND_MONEY}?${STEP}1`));
    }
  }, [step, formState, navigate]);

  return <>{renderStep(formState)}</>;

  function renderStep(formState: { alias: string; amount: string }) {
    const { amount } = formState;
    const { Argentina } = currencies;
    const { locales, currency } = Argentina;
    switch (step) {
      case '1':
        return (
          <FormSingle
            name="alias"
            title="Agregá una nueva cuenta"
            label="CVU ó Alias"
            type="text"
            actionLabel="Continuar"
            validation={aliasValidationConfig}
            formState={formState}
            handleChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(event)}
            submit={() => onNavigate(2)}
          />
        );
      case '2':
        return (
          <FormSingle
            name="amount"
            title="¿Cuanto quieres transferir a ?"
            label="Monto"
            type="number"
            actionLabel="Continuar"
            validation={moneyValidationConfig}
            formState={formState}
            handleChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange(event)}
            submit={() => onNavigate(3)}
          />
        );
      case '3':
        return (
          <>
            <CardCustom
              content={
                <div className="tw-flex tw-flex-col">
                  <div className="tw-flex tw-justify-between tw-mb-4">
                    <p className="tw-font-bold">Revisá que está todo bien</p>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mb-4">
                    <div className="tw-flex tw-gap-2">
                      <p className="">Vas a transferir</p>
                      <Link to={`${ROUTES.SEND_MONEY}?${STEP}2`}>
                        <Icon type="edit" />
                      </Link>
                    </div>
                    <p className="tw-font-bold">
                      {formatCurrency(locales, currency, parseFloat(amount))}
                    </p>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mb-4">
                    <p className="">Para</p>
                    <p className="tw-font-bold">John Esteban</p>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mb-4">
                    <p className="">Brubank</p>
                    <p className="tw-font-bold">CVU: 03249239420940932923</p>
                  </div>
                </div>
              }
              actions={
                <div className="tw-flex tw-w-full tw-justify-end tw-mt-6">
                  <Button
                    type="submit"
                    className="tw-h-12 tw-w-64"
                    variant="outlined"
                    onClick={() => console.log('Transfiriendo...')}
                  >
                    Transferir
                  </Button>
                </div>
              }
            />
          </>
        );
    }
  }
}
