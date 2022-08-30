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
} from '../../utils/';
import { ErrorMessage, Errors } from '../../components/ErrorMessage';
interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    criteriaMode: 'all',
  });

  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div
      className="tw-w-full tw-flex tw-flex-col tw-flex-1 tw-items-center tw-justify-center"
      style={{
        height: 'calc(100vh - 128px)',
      }}
    >
      <h2>Iniciar sesión</h2>
      <form
        className="tw-flex tw-flex-col tw-mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          className="tw-m-0 tw-mb-5"
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">Correo</InputLabel>
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
        <FormControl
          className="tw-m-0 tw-mb-5"
          variant="outlined"
        >
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
        {errors.password && <ErrorMessage errors={errors.password as Errors} />}
        <Button
          className={`tw-h-14 ${
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
      </form>
    </div>
  );
};

export default Login;
