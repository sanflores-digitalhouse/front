import { ERROR_MESSAGES } from '../../constants';

export const phoneRegExp =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
export const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const isValueEmpty = (values: any): boolean =>
  Object.values(values).some((value) => value === '');
export const valuesHaveErrors = (errors: any): boolean =>
  Object.keys(errors).length !== 0;

export const emailValidationConfig = {
  required: {
    value: true,
    message: ERROR_MESSAGES.REQUIRED_FIELD,
  },
  pattern: {
    value: emailRegExp,
    message: ERROR_MESSAGES.INVALID_EMAIL,
  },
};

export const passwordValidationConfig = {
  required: {
    value: true,
    message: ERROR_MESSAGES.REQUIRED_FIELD,
  },
  pattern: {
    value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/,
    message: ERROR_MESSAGES.INVALID_PASSWORD,
  },
  minLength: {
    value: 6,
    message: ERROR_MESSAGES.MIN_LENGTH,
  },
  maxLength: {
    value: 20,
    message: ERROR_MESSAGES.MAX_LENGTH,
  },
};
