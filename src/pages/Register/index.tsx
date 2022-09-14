import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  isValueEmpty,
  valuesHaveErrors,
  emailValidationConfig,
  passwordValidationConfig,
  nameValidationConfig,
  phoneValidationConfig,
  dniValidationConfig,
} from '../../utils/';
import { ErrorMessage, Errors } from '../../components/ErrorMessage';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

interface State {
  name: string;
  lastName: string;
  phone: string;
  dni: string;
  email: string;
  password: string;
  passwordRepeated: string;
  showPassword: boolean;
}

interface RegisterInputs {
  name: string;
  lastName: string;
  phone: string;
  dni: string;
  email: string;
  password: string;
  passwordRepeated: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<RegisterInputs>({
    criteriaMode: 'all',
  });

  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    name: '',
    lastName: '',
    phone: '',
    dni: '',
    passwordRepeated: '',
    showPassword: false,
  });

  const isEmpty = isValueEmpty(values);

  const hasErrors = valuesHaveErrors(errors);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => console.log(data);

  return (
    <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-flex-1 tw-items-center tw-justify-center">
      <h2>Crear cuenta</h2>
      <div className="tw-flex tw-max-w-3xl">
        <form
          className="tw-flex tw-flex-wrap tw-gap-x-16 tw-gap-y-12 tw-mt-10 tw-bg-background tw-justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Nombre
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-name"
                type="text"
                value={values.name}
                {...register('name', nameValidationConfig)}
                onChange={handleChange('name')}
                label="nombre"
                autoComplete="off"
              />
            </FormControl>
            {errors.name && <ErrorMessage errors={errors.name as Errors} />}
          </div>
          <div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Apellido
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-last-name"
                type="text"
                value={values.lastName}
                {...register('lastName', nameValidationConfig)}
                onChange={handleChange('lastName')}
                label="lastName"
                autoComplete="off"
              />
            </FormControl>
            {errors.lastName && (
              <ErrorMessage errors={errors.lastName as Errors} />
            )}
          </div>
          <div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-dni">DNI</InputLabel>
              <OutlinedInput
                id="outlined-adornment-dni"
                type="text"
                value={values.dni}
                {...register('dni', dniValidationConfig)}
                onChange={handleChange('dni')}
                label="dni"
                autoComplete="off"
              />
            </FormControl>
            {errors.dni && <ErrorMessage errors={errors.dni as Errors} />}
          </div>

          <div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Correo
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="text"
                value={values.email}
                {...register('email', emailValidationConfig)}
                onChange={handleChange('email')}
                label="email"
                autoComplete="off"
              />
            </FormControl>
            {errors.email && <ErrorMessage errors={errors.email as Errors} />}
          </div>
          <div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                {...register('password', passwordValidationConfig)}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      className="tw-text-neutral-gray-100"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                autoComplete="off"
              />
            </FormControl>
            {errors.password && (
              <ErrorMessage errors={errors.password as Errors} />
            )}
          </div>

          <div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password-repeated">
                Confirmar contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-repeated"
                type={values.showPassword ? 'text' : 'password'}
                value={values.passwordRepeated}
                {...register('passwordRepeated', {
                  validate: (value: string) => {
                    if (watch('password') !== value) {
                      return ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH;
                    }
                  },
                })}
                onChange={handleChange('passwordRepeated')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      className="tw-text-neutral-gray-100"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                autoComplete="off"
              />
            </FormControl>
            {errors.password && (
              <ErrorMessage errors={errors.passwordRepeated as Errors} />
            )}
          </div>

          <div>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-dni">Télefono</InputLabel>
              <OutlinedInput
                id="outlined-adornment-phone"
                type="text"
                value={values.phone}
                {...register('phone', phoneValidationConfig)}
                onChange={handleChange('phone')}
                label="phone"
                autoComplete="off"
              />
            </FormControl>
            {errors.phone && <ErrorMessage errors={errors.phone as Errors} />}
          </div>
          <div className="tw-w-full tw-flex tw-justify-center">
            <Button
              className={`tw-h-14 tw-w-80 ${
                hasErrors || !isDirty || isEmpty
                  ? 'tw-text-neutral-gray-300 tw-border-neutral-gray-300 tw-cursor-not-allowed'
                  : ''
              }`}
              type="submit"
              variant="outlined"
              disabled={hasErrors || !isDirty || isEmpty}
            >
              Ingresar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
