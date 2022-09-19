import React from 'react';
import { RecordsProps, RecordVariant } from '../../components/Records/index';
import { CardCustom, Records } from '../../components';
import Pagination from '@mui/material/Pagination';
import { USER } from '../../data/user';

export type ActivitiesProps = RecordsProps;

const { activities } = USER;
const records = activities.map((activity) => {
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

const Activity = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const recordsPerPage = 10;
  const numberOfPages = Math.ceil(records.length / recordsPerPage);
  const isRecordsGreeterThanOnePage = records.length > recordsPerPage;
  return (
    <div className="tw-w-full">
      <CardCustom
        content={
          <>
            <div>
              <p className="tw-mb-4 tw-font-bold">Tu actividad</p>
            </div>
            <Records
              records={records}
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
