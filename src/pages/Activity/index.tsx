import React from 'react';
import { RecordVariant, RecordProps } from '../../components/Records/';
import { CardCustom, Records } from '../../components';
import Pagination from '@mui/material/Pagination';
import { USER } from '../../data/user';
import { usePagination } from '../../hooks/usePagination';


const { activities } = USER;
const transactions = activities.map((activity) => {
  const { amount, name, date, type } = activity;
  return {
    content: {
      amount,
      name,
      date,
      type,
    },
    variant: RecordVariant.TRANSACTION,
  };
});

const recordsPerPage = 10;
const Activity = () => {
  const { page, handleChange, numberOfPages, isRecordsGreeterThanOnePage } =
    usePagination(transactions as RecordProps[], recordsPerPage);

  return (
    <div className="tw-w-full">
      <CardCustom
        content={
          <>
            <div>
              <p className="tw-mb-4 tw-font-bold">Tu actividad</p>
            </div>
            <Records
              records={transactions}
              initialRecord={page * recordsPerPage - recordsPerPage}
            />
          </>
        }
        actions={
          isRecordsGreeterThanOnePage && (
            <div className="tw-h-12 tw-w-full tw-flex tw-items-center tw-justify-center tw-px-4 tw-mt-4">
              <Pagination
                count={numberOfPages}
                onChange={handleChange}
                shape="rounded"
              />
            </div>
          )
        }
        className="tw-max-w-5xl"
      />
    </div>
  );
};
export default Activity;
