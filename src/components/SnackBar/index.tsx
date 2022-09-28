import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

export interface ISnackBar {
  duration: number
  message: string
}

export const SnackBar = ({ duration, message }: ISnackBar) => {
  const [open, setOpen] = useState<boolean>(true);

  const closeNotification = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={closeNotification}
    >
      <div className="tw-bg-primary tw-p-4 tw-rounded">{message}</div>
    </Snackbar>
  );
};
