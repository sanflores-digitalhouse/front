import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateRoutesProps {
  isAuthenticated: boolean;
}
export const PrivateRoutes = ({ isAuthenticated }: PrivateRoutesProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
