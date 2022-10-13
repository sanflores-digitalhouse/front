import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './components';
import { ROUTES } from './constants';
import { Layout } from './components/Layout';
import './tailwind/styles.css';
import CircularProgress from '@mui/material/CircularProgress';
import { getUser, parseJwt } from './utils';
import { useUserInfo, useLocalStorage } from './hooks';

// pages
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Register = React.lazy(() => import('./pages/Register'));
const Activity = React.lazy(() => import('./pages/Activity'));
const ActivityDetails = React.lazy(() => import('./pages/ActivityDetails'));
const Cards = React.lazy(() => import('./pages/Cards'));
const SendMoney = React.lazy(() => import('./pages/SendMoney'));
const LoadMoney = React.lazy(() => import('./pages/LoadMoney'));
const Profile = React.lazy(() => import('./pages/Profile'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));

function App() {
  const { dispatch } = useUserInfo();
  const [token] = useLocalStorage('token');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  useEffect(() => {
    if (isAuthenticated) {
      const token = window.localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        const info = parseJwt(token);
        const userId = info && info.sub;
        userId &&
          getUser(userId).then((res) =>
            dispatch({ type: 'SET_USER', payload: res })
          );
      }
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Layout isAuthenticated={isAuthenticated}>
          <Suspense
            fallback={
              <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center">
                <CircularProgress />
              </div>
            }
          >
            <Routes>
              <React.Fragment></React.Fragment>
              <Route
                path={ROUTES.HOME}
                element={<PrivateRoutes isAuthenticated={isAuthenticated} />}
              >
                <Route element={<Dashboard />} path={ROUTES.HOME} />
                <Route element={<Activity />} path={`${ROUTES.ACTIVITY}`} />
                <Route element={<Cards />} path={ROUTES.CARDS} />
                <Route element={<SendMoney />} path={ROUTES.SEND_MONEY} />
                <Route element={<LoadMoney />} path={ROUTES.LOAD_MONEY} />
                <Route element={<Profile />} path={ROUTES.PROFILE} />
                <Route
                  element={<ActivityDetails />}
                  path={ROUTES.ACTIVITY_DETAILS}
                />
              </Route>
              <Route
                element={
                  isAuthenticated ? (
                    <Navigate replace to={ROUTES.HOME} />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  )
                }
                path={ROUTES.LOGIN}
              />
              <Route
                element={
                  isAuthenticated ? (
                    <Navigate replace to={ROUTES.HOME} />
                  ) : (
                    <Register setIsAuthenticated={setIsAuthenticated} />
                  )
                }
                path={ROUTES.REGISTER}
              />
              <Route element={<PageNotFound />} path="*" />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
