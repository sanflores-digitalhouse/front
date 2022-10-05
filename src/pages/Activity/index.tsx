import React, { useEffect, useState } from 'react';
import {
  CardCustom,
  Records,
  RecordVariant,
  IRecord,
  Transaction,
  Skeleton,
  SkeletonVariant,
} from '../../components';
import Pagination from '@mui/material/Pagination';
import { usePagination } from '../../hooks/usePagination';
import { ROUTES } from '../../constants';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom';
import { pageQuery } from '../../common/';
import {
  getUserActivities,
  parseActivities,
  parseRecordContent,
} from '../../utils';

const recordsPerPage = 10;
const Activity = () => {
  const [userActivities, setUserActivities] = useState<IRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { pageNumber, numberOfPages, isRecordsGreeterThanOnePage } =
    usePagination(userActivities as IRecord[], recordsPerPage);
  //TODO: replace with real data

  useEffect(() => {
    getUserActivities('1')
      .then((activities) => {
        const parsedActivities = parseActivities(activities);
        const parsedRecords = parsedActivities.map(
          (parsedActivity: Transaction) =>
            parseRecordContent(parsedActivity, RecordVariant.TRANSACTION)
        );
        setUserActivities(parsedRecords);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="tw-w-full">
      <CardCustom
        className="tw-max-w-5xl"
        content={
          <>
            <div>
              <p className="tw-mb-4 tw-font-bold">Tu actividad</p>
            </div>
            {userActivities.length > 0 && !isLoading && (
              <Records
                records={userActivities}
                initialRecord={pageNumber * recordsPerPage - recordsPerPage}
              />
            )}
            {userActivities.length === 0 && !isLoading && (
              <p>No hay actividad registrada</p>
            )}
            {isLoading && <Skeleton variant={SkeletonVariant.RECORD_LIST} />}
          </>
        }
        actions={
          isRecordsGreeterThanOnePage && (
            <div className="tw-h-12 tw-w-full tw-flex tw-items-center tw-justify-center tw-px-4 tw-mt-4">
              <Pagination
                count={numberOfPages}
                shape="rounded"
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={pageQuery(ROUTES.ACTIVITY, item.page as number)}
                    {...item}
                  />
                )}
              />
            </div>
          )
        }
      />
    </div>
  );
};
export default Activity;
