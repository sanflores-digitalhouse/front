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
import { emailRegExp, isValueEmpty, valuesHaveErrors } from '../../utils/';

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
  } = useForm<Inputs>();

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
    <div className="tw-pt-24 tw-w-full tw-flex tw-flex-col tw-flex-1 tw-items-center">
      <h2>Iniciar sesión</h2>
      <form
        className="tw-flex tw-flex-col tw-mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          className="tw-bg-neutral-gray-500 tw-m-0 tw-mb-5"
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
        >
          <InputLabel
            className="tw-text-neutral-gray-100"
            htmlFor="outlined-adornment-password"
          >
            Correo
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type="text"
            value={values.email}
            {...register('email', {
              required: true,
              pattern: emailRegExp,
            })}
            onChange={handleChange('email')}
            className="tw-text-neutral-gray-100"
            label="email"
            autoComplete="off"
          />
        </FormControl>
        {errors.email && <p>This field is required</p>}
        <FormControl
          className="tw-bg-neutral-gray-500 tw-m-0 tw-mb-5"
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
        >
          <InputLabel
            className="tw-text-neutral-gray-100"
            htmlFor="outlined-adornment-password"
          >
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            {...register('password')}
            onChange={handleChange('password')}
            className="tw-text-neutral-gray-100"
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
        {errors.password && <p>This field is required</p>}
        <Button
          className={`${
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
