import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="!tw-bg-background tw-px-10 !tw-text-neutral-gray-100 tw-border-b tw-border-neutral-blue-100 tw-backdrop-blur-lg tw-shadow-none"
        position="static"
      >
        <Toolbar>
          <Button color="inherit">Crear cuenta</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
