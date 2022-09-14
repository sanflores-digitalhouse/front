import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './components';
import { ROUTES } from './constants';
import { Layout } from './components/Layout';
// pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<PrivateRoutes />}>
                <Route element={<Dashboard />} path={ROUTES.HOME} />
              </Route>
              <Route element={<Login />} path={ROUTES.LOGIN} />
              <Route element={<Register />} path={ROUTES.REGISTER} />
            </Routes>
          </Layout>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
