import React from 'react';
import { RecordProps, Record } from './components/record';

export interface RecordsProps {
  records?: RecordProps[];
}

const RecordsMock = [
  {
    type: 'Transfer',
    name: 'Rodrigo',
    amount: 2000,
    date: 'Sabado',
  },
  {
    type: 'Transfer',
    name: 'Rodrigo',
    amount: 2000,
    date: 'Sabado',
  },
];

export const Records = ({ records = RecordsMock }: RecordsProps) => {
  return (
    <ul className="tw-w-full">
      {records.map((record: RecordProps, index: number) => (
        <Record key={`record-${index}`} {...record} />
      ))}
    </ul>
  );
};

export * from './components/record';
