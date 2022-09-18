import React from 'react';
import { RecordProps, Record } from './components/record';
import { USER } from '../../data';

export interface RecordsProps {
  records?: RecordProps[];
  maxRecords?: number;
  initialRecord?: number;
}

const { activities } = USER;

export const Records = ({ records = activities, maxRecords, initialRecord = 0 }: RecordsProps) => {
  return (
    <ul className="tw-w-full">
      {records
        .slice(initialRecord, maxRecords ? maxRecords : records.length)
        .map((record: RecordProps, index: number) => (
          <Record key={`record-${index}`} {...record} />
        ))}
    </ul>
  );
};

export * from './components/record';
