import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Dashboard = () => {
  return (
    <div className="tw-w-full">
      <Card
        className="tw-p-10 tw-max-w-2xl tw-mx-auto tw-mt-12 tw-bg-background tw-text-neutral-gray-100 tw-border-2 tw-border-neutral-blue-100 tw-rounded-lg"
        variant="outlined"
      >
        <CardContent className="tw-flex tw-justify-between tw-items-start tw-mb-8 tw-p-0">
          <div>
            <p className="tw-mb-4">Dinero disponible</p>
            <p className="tw-text-xl tw-font-bold">$6.890.534,17</p>
          </div>
          <div className="tw-flex tw-justify-between tw-items-start tw-flex-wrap tw-gap-x-4">
            <Link
              className="tw-underline hover:tw-text-primary"
              to={ROUTES.HOME}
            >
              Ver tarjetas
            </Link>
            <Link
              className="tw-underline hover:tw-text-primary"
              to={ROUTES.HOME}
            >
              Ver CVU
            </Link>
          </div>
        </CardContent>
        <CardActions className="tw-flex tw-flex-wrap tw-justify-evenly tw-p-0">
          <Button className="tw-h-12 tw-w-64" variant="outlined">
            Transferir dinero
          </Button>
          <Button className="tw-h-12 tw-w-64" variant="contained">
            Ingresar dinero
          </Button>
        </CardActions>
      </Card>

      <Card
        className="tw-p-10 tw-max-w-2xl tw-mx-auto tw-mt-12 tw-bg-background tw-text-neutral-gray-100 tw-border-2 tw-border-neutral-blue-100 tw-rounded-lg"
        variant="outlined"
      >
        <CardContent className="tw-flex tw-justify-between tw-items-start tw-mb-8 tw-p-0"></CardContent>
        <CardActions className="tw-flex tw-flex-wrap tw-p-0">
          <Link
            to={ROUTES.HOME}
            className="tw-h-12 tw-w-full tw-flex tw-items-center tw-justify-between hover:tw-text-primary"
          >
            <span>Ver toda tu actividad</span>
            <ArrowForwardIosIcon />
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default Dashboard;
