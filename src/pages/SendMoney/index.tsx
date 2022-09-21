import React from 'react';
import {
  CardCustom,
  RecordProps,
  Records,
  RecordVariant,
} from '../../components';
import { ADD, ROUTES } from '../../constants';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { usePagination } from '../../hooks/usePagination';
import { USER } from '../../data/user';
import { Pagination } from '@mui/material';

const { accounts } = USER;
const userAccounts = accounts.map((account) => {
  const { name } = account;
  return {
    content: {
      name,
    },
    variant: RecordVariant.ACCOUNT,
  };
});

const SendMoney = () => {
  const recordsPerPage = 10;
  const { page, handleChange, numberOfPages, isRecordsGreeterThanOnePage } =
    usePagination(userAccounts as RecordProps[], recordsPerPage);
  return (
    <div className="tw-w-full">
      <CardCustom
        className="tw-max-w-5xl"
        content={
          <div className="tw-flex tw-justify-between tw-mb-8">
            <p className="tw-mb-4 tw-font-bold">
              Elegí a qué cuenta transferir
            </p>
          </div>
        }
        actions={
          <Link
            to={`${ROUTES.CARDS}?${ADD}`}
            className="tw-w-full tw-flex tw-items-center tw-justify-between"
          >
            <div className="tw-flex tw-items-center tw-gap-x-4">
              <div className="tw-rounded-full tw-w-8 tw-h-8 tw-bg-red" />
              <p>Nueva cuenta</p>
            </div>
            <ArrowForwardIosIcon />
          </Link>
        }
      />
      <CardCustom
        className="tw-max-w-5xl"
        content={
          <>
            <div>
              <p className="tw-mb-4 tw-font-bold">Tus tarjetas</p>
            </div>
            <Records
              records={userAccounts}
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
      />
    </div>
  );
};

export default SendMoney;
