import React, { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  CardCustom,
  Icon,
  ErrorMessage,
  Errors,
  SnackBar,
} from '../../components';
import { ROUTES, SELECT, SUCCESS } from '../../constants';
import {
  handleChange,
  moneyValidationConfig,
  isValueEmpty,
  valuesHaveErrors,
  createDepositActivity,
} from '../../utils';
import { useLocalStorage, useUserInfo } from '../../hooks';

const LoadMoney = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cardType = !!searchParams.get('type');
  const card = !!searchParams.get('card');
  const isError = !!searchParams.get('error');
  const { user } = useUserInfo();
  const { id } = user;
  const [token] = useLocalStorage('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    criteriaMode: 'all',
  });

  const [formState, setFormState] = useState<{
    money: string | undefined;
    focused: undefined | string;
  }>({
    money: undefined,
    focused: undefined,
  });

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFormState({ ...formState, focused: event.target.name });
  };

  const isEmpty = isValueEmpty(formState);
  const hasErrors = useMemo(() => valuesHaveErrors(errors), [errors]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleChange(event, setFormState);

  const onSubmit: SubmitHandler<any> = (data) => {
    createDepositActivity(id, parseFloat(data.money), token)
      .then(() => {
        navigate(`${ROUTES.HOME}?${SUCCESS}`);
      })
      .catch(() => {
        navigate(
          `${ROUTES.LOAD_MONEY}?type=${cardType}&card=${card}&error=true`
        );
      });
  };

  if (cardType && card) {
    return (
      <div className="tw-w-full">
        <CardCustom
          className="tw-max-w-5xl"
          content={
            <>
              <div className="tw-flex tw-justify-between tw-mb-4">
                <p className="tw-font-bold">
                  ¿Cuánto querés ingresar a la cuenta?
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-money"
                      type="text"
                      value={formState.money}
                      {...register('money', moneyValidationConfig)}
                      onChange={onChange}
                      label="money"
                      autoComplete="off"
                      onFocus={handleFocus}
                      placeholder="0"
                    />
                  </FormControl>
                  {errors.money && (
                    <ErrorMessage errors={errors.money as Errors} />
                  )}
                  <div className="tw-flex tw-w-full tw-justify-end tw-mt-6">
                    <Button
                      type="submit"
                      className={`tw-h-12 tw-w-64 ${
                        hasErrors || !isDirty || isEmpty
                          ? 'tw-text-neutral-gray-300 tw-border-neutral-gray-300 tw-cursor-not-allowed'
                          : ''
                      }`}
                      variant="outlined"
                      disabled={hasErrors || !isDirty || isEmpty}
                    >
                      Confirmar
                    </Button>
                  </div>
                </div>
              </form>
            </>
          }
        />
      </div>
    );
  }

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
      {isError && (
        <SnackBar
          duration={3000}
          message="Hubo un error al ingresar el dinero. Intente nuevamente más tarde."
          type="error"
        />
      )}
    </div>
  );
};

export default LoadMoney;
