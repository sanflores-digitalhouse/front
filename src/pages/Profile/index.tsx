import React, { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ROUTES, EDIT } from '../../constants';
import { CardCustom, Tooltip, TooltipPosition, Icon, ErrorMessage, Errors, SnackBar  } from '../../components';
import { 
  handleChange,
  aliasValidationConfig,
  isValueEmpty,
  valuesHaveErrors,
  copyToClipboard
} from '../../utils';

export interface IProfile {
  alias?: string 
}

const Profile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditing = !!searchParams.get('edit');
  const isSuccess = !!searchParams.get('success');
  const isError = !!searchParams.get('error');

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, isDirty },
  } = useForm({
    criteriaMode: 'all'
  });
  const [formState, setFormState] = useState<{alias: string, focused: undefined | string}>({
    alias: 'estealias.no.existe',
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

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    const fakeCondition = true;

    if (fakeCondition) {
      navigate('/profile?success=true');
      return data;
    } 

    navigate('/profile?edit=true&error=true');
    return data;
  };

  return (
    <div className="tw-w-full">
      {
        !isEditing ?
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
                  <Tooltip
                    className="tw-cursor-pointer"
                    message="Copiado"
                    position={TooltipPosition.top}
                  >
                    <button
                      onClick={() => copyToClipboard('0000002100075320000000')}
                    >
                      <Icon type="copy" />
                    </button>
                  </Tooltip>
                </div>
                <div className="tw-flex tw-justify-between tw-items-center">
                  <div>
                    <p className="tw-font-bold tw-text-primary">Alias</p>
                    <p className="">estealias.no.existe</p>
                  </div>
                  <div className="tw-flex">
                    <Link
                      to={`${ROUTES.PROFILE}?${EDIT}`}
                    >
                      <Icon type="edit" />
                    </Link>
                    <Tooltip
                      className="tw-cursor-pointer tw-ml-4"
                      message="Copiado"
                      position={TooltipPosition.top}
                    >
                      <button onClick={() => copyToClipboard('estealias.no.existe')}>
                        <Icon type="copy" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            }
          /> :
          <CardCustom
            className="tw-max-w-5xl"
            content={
              <div className="tw-flex tw-flex-col">
                <p className="tw-font-bold tw-mb-4">Editar alias</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-alias">
                        Alias
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-alias"
                        type="text"
                        value={formState.alias}
                        {...register('alias', aliasValidationConfig)}
                        onChange={onChange}
                        label="alias"
                        autoComplete="off"
                        onFocus={handleFocus}
                      />
                    </FormControl>
                    {errors.alias && <ErrorMessage errors={errors.alias as Errors} />}
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
              </div>
            }
          />
      }
      {
        isSuccess && <SnackBar duration={3000} message="El alias se actualizó correctamente" />
      }
      {
        isError && <SnackBar duration={3000} message="El alias seleccionado ya existe. Debe ingresar uno nuevo." />
      }
    </div>
  );
};

export default Profile;
