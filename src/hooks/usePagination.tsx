import { useSearchParams } from 'react-router-dom';
import { RecordProps } from '../components/Records/';

export const usePagination = (
  records: RecordProps[],
  recordsPerPage: number,
  initialPage = 1
) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const pageNumber = (page && parseInt(page, 10)) || initialPage;

  const numberOfPages = Math.ceil(records.length / recordsPerPage);
  const isRecordsGreeterThanOnePage = records.length > recordsPerPage;
  return {
    pageNumber,
    numberOfPages,
    isRecordsGreeterThanOnePage,
  };
};
