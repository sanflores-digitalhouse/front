import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './components';
import { ROUTES } from './constants';
import { Layout } from './components/Layout';
import './tailwind/styles.css';

// pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Activity = React.lazy(() => import('./pages/Activity'));
const auth = { token: true };
function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout isAuthenticated={auth.token}>
            <Routes>
              <Route
                path={ROUTES.HOME}
                element={<PrivateRoutes isAuthenticated={auth.token} />}
              >
                <Route element={<Dashboard />} path={ROUTES.HOME} />
                <Route element={<Activity />} path={ROUTES.ACTIVITY} />
              </Route>
              <Route
                element={
                  auth.token ? <Navigate replace to={ROUTES.HOME} /> : <Login />
                }
                path={ROUTES.LOGIN}
              />
              <Route
                element={
                  auth.token ? (
                    <Navigate replace to={ROUTES.HOME} />
                  ) : (
                    <Register />
                  )
                }
                path={ROUTES.REGISTER}
              />
            </Routes>
          </Layout>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
