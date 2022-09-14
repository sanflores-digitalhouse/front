import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const auth = { token: true };
export const PrivateRoutes = () => {
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};
