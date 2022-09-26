import React, { useState } from 'react';
import { usePagination } from '../../hooks/usePagination';
import { USER } from '../../data/user';
import {
  CardCustom,
  ErrorMessage,
  Errors,
  Icon,
  RecordProps,
  Records,
  RecordVariant,
} from '../../components';
import { Button, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES, ADD, CARDS_PLACEHOLDERS } from '../../constants';
import { useSearchParams } from 'react-router-dom';
import {
  default as CardsComponent,
  Focused,
  ReactCreditCardProps,
} from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { transformExpiration } from '../../utils/formValidation/index';
import {
  handleChange,
  nameValidationConfig,
  cardValidationConfig,
  expirationValidationConfig,
  cvcValidationConfig,
} from '../../utils/';

const { account } = USER;
const { cards } = account;
const userCards = cards.map((card) => {
  const { number, name, type } = card;
  return {
    content: {
      number,
      name,
      type,
    },
    variant: RecordVariant.CARD,
  };
});

const Cards = () => {
  const recordsPerPage = 10;
  const { page, handleChange, numberOfPages, isRecordsGreeterThanOnePage } =
    usePagination(userCards as RecordProps[], recordsPerPage);
  const [searchParams] = useSearchParams();
  const isAdding = !!searchParams.get('add');

  return (
    <div className="tw-w-full">
      {!isAdding ? (
        <>
          <CardCustom
            className="tw-max-w-5xl"
            content={
              <div className="tw-flex tw-justify-between tw-mb-4">
                <p className="tw-font-bold">
                  Agregá tu tarjeta de débito o crédito
                </p>
              </div>
            }
            actions={
              <Link
                to={`${ROUTES.CARDS}?${ADD}`}
                className="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-4 hover:tw-bg-neutral-gray-500 tw-transition"
              >
                <div className="tw-flex tw-items-center tw-gap-x-4">
                  <Icon type="add" />
                  <p>Nueva tarjeta</p>
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
                  <p className="tw-mb-4 tw-font-bold">Tus tarjetas</p>
                </div>
                <Records
                  records={userCards}
                  initialRecord={page * recordsPerPage - recordsPerPage}
                />
              </>
            }
            actions={
              isRecordsGreeterThanOnePage && (
                <div className="tw-h-12 tw-w-full tw-flex tw-items-center tw-justify-center tw-px-4 tw-mt-4">
                  <Pagination
                    count={numberOfPages}
                    onChange={handleChange}
                    shape="rounded"
                  />
                </div>
              )
            }
          />
        </>
      ) : (
        <CardForm />
      )}
    </div>
  );
};

export default Cards;

function CardForm() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<ReactCreditCardProps>({
    criteriaMode: 'all',
  });
  const [formState, setFormState] = useState<ReactCreditCardProps>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: undefined,
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    maxLength?: number
  ) => handleChange<ReactCreditCardProps>(event, setFormState, maxLength);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFormState({ ...formState, focused: event.target.name as Focused });
  };

  const onSubmit: SubmitHandler<ReactCreditCardProps> = (data) => {
    const { expiry } = data;
    transformExpiration(expiry as number);
  };

  return (
    <>
      <CardCustom
        className="tw-max-w-5xl"
        content={
          <div className="tw-flex tw-flex-col" id="PaymentForm">
            <div className="tw-mb-5">
              <CardsComponent
                cvc={formState.cvc}
                expiry={formState.expiry}
                focused={formState.focused}
                name={formState.name}
                number={formState.number}
                placeholders={{
                  name: CARDS_PLACEHOLDERS.name,
                }}
                locale={{
                  valid: CARDS_PLACEHOLDERS.validThru,
                }}
              />
            </div>
            <form
              className="tw-flex tw-flex-wrap tw-gap-y-12 tw-gap-x-16 tw-justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-number">
                    Número
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-number"
                    type="number"
                    value={formState.number}
                    {...register('number', cardValidationConfig)}
                    onChange={(event) => onChange(event, 16)}
                    label="number"
                    autoComplete="off"
                    onFocus={handleFocus}
                  />
                </FormControl>
                {errors.number && (
                  <ErrorMessage errors={errors.number as Errors} />
                )}
              </div>
              <div>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-name">
                    Nombre
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    value={formState.name}
                    {...register('name', nameValidationConfig)}
                    onChange={onChange}
                    label="name"
                    autoComplete="off"
                    onFocus={handleFocus}
                  />
                </FormControl>
                {errors.name && <ErrorMessage errors={errors.name as Errors} />}
              </div>
              <div>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-expiry">
                    Válida hasta
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-expiry"
                    type="number"
                    value={formState.expiry}
                    {...register('expiry', expirationValidationConfig)}
                    onChange={(event) => onChange(event, 4)}
                    label="expiry"
                    autoComplete="off"
                    onFocus={handleFocus}
                  />
                </FormControl>
                {errors.expiry && (
                  <ErrorMessage errors={errors.expiry as Errors} />
                )}
              </div>
              <div>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-cvc">CVC</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-cvc"
                    type="number"
                    value={formState.cvc}
                    {...register('cvc', cvcValidationConfig)}
                    onChange={(event) => onChange(event, 3)}
                    label="cvc"
                    autoComplete="off"
                    onFocus={handleFocus}
                  />
                </FormControl>
              </div>
              <div className="tw-flex tw-w-full tw-justify-end tw-mt-6">
                <Button
                  type="submit"
                  className="tw-h-12 tw-w-64"
                  variant="outlined"
                >
                  Agregar
                </Button>
              </div>
            </form>
          </div>
        }
      />
    </>
  );
}
