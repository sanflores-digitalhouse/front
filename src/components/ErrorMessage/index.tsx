import React from 'react';

export interface Errors {
  types: Record<string, string>; message: string
}

export interface ErrorMessageProps {
  errors: Errors;
}

export const ErrorMessage = ({ errors }: ErrorMessageProps) => {
  const { types } = errors;
  const messages = Object.keys(types).map((key) => types[key]);

  return (
    <ul className="tw-flex tw-flex-col tw-gap-y-4 tw-mb-5">
      {messages.map((message, index) => (
        <li className="tw-text-red" key={`error-${index}`}>
          {message}
        </li>
      ))}
    </ul>
  );
};
