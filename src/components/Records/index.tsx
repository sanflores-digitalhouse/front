import React from 'react';
import { RecordProps, Record } from './components/record';
import { USER } from '../../data';

export interface RecordsProps {
  records?: RecordProps[];
  maxRecords?: number;
  initialRecord?: number;
}

const { activities } = USER;

export const Records = ({
  records = activities,
  maxRecords,
  initialRecord = 0,
}: RecordsProps) => {
  const recordsToShow = records.slice(initialRecord, maxRecords);
  return (
    <ul className="tw-w-full">
      {recordsToShow &&
        recordsToShow.map((record: RecordProps, index: number) => (
          <Record
            key={`record-${index}`}
            {...record}
            className={`
              ${index + 1 === recordsToShow.length && 'tw-border-b'}`}
          />
        ))}
    </ul>
  );
};

export * from './components/record';
