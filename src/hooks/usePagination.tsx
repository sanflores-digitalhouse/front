import React from 'react';
import { RecordProps } from '../components/Records/';

export const usePagination = (
  records: RecordProps[],
  recordsPerPage: number,
  initialPage = 1
) => {
  const [page, setPage] = React.useState(initialPage);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const numberOfPages = Math.ceil(records.length / recordsPerPage);
  const isRecordsGreeterThanOnePage = records.length > recordsPerPage;
  return {
    page,
    handleChange,
    numberOfPages,
    isRecordsGreeterThanOnePage,
  };
};
