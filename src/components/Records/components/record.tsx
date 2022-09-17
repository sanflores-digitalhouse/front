import React from 'react';

export interface RecordProps {
  type: string;
  name: string;
  amount: number;
  date: string;
}

export const Record = ({
  type = 'Transfer',
  name = 'Rodrigo',
  amount = 2000,
  date = 'Sabado',
}: RecordProps) => {
  return (
    <li className="tw-flex tw-w-full tw-justify-between tw-px-4 tw-border-t tw-border-neutral-blue-100 tw-py-5 hover:tw-bg-neutral-gray-500 tw-transition">
      <div className="tw-flex tw-items-center tw-gap-x-4">
        <div className="tw-rounded-full tw-w-8 tw-h-8 tw-bg-red" />
        <p>
          {type} a {name}
        </p>
      </div>
      <div>
        <p>{amount}</p>
        <p>{date}</p>
      </div>
    </li>
  );
};
