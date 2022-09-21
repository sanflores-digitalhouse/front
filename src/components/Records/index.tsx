import React from 'react';
import { RecordProps, Record } from './components/record';

export interface RecordsProps {
  records: RecordProps[];
  maxRecords?: number;
  initialRecord?: number;
}

export const Records = ({
  records,
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
