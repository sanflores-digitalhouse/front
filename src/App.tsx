import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './components';
import { ROUTES } from './constants';
// pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<PrivateRoutes />}>
              <Route element={<Dashboard />} path={ROUTES.HOME} />
            </Route>
            <Route element={<Login />} path={ROUTES.LOGIN} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
