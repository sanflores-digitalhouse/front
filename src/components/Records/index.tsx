import React from 'react';
import { RecordProps, Record } from './components/record';
import { USER } from '../../data';

export interface RecordsProps {
  records?: RecordProps[];
}

const { activities } = USER;

export const Records = ({ records = activities }: RecordsProps) => {
  return (
    <ul className="tw-w-full">
      {records.map((record: RecordProps, index: number) => (
        <Record key={`record-${index}`} {...record} />
      ))}
    </ul>
  );
};

export * from './components/record';
