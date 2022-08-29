export const phoneRegExp =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
export const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const isValueEmpty = (values: any): boolean =>
  Object.values(values).some((value) => value === '');
export const valuesHaveErrors = (errors: any): boolean => Object.keys(errors).length !== 0;
