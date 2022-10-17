import React, { createContext, useEffect, useReducer } from 'react';
import userReducer from './userReducer';
import { User } from '../../types';
import { useAuth, useLocalStorage } from '../../hooks';
import { getUser, parseJwt } from '../../utils';
import { userActionTypes } from './types';
export interface UserInfoState {
  user: User;
  loading: boolean;
}

const initialState = {
  user: {} as User,
  loading: true,
};

export const userInfoContext = createContext<{
  user: any;
  loading: boolean;
  dispatch: React.Dispatch<any>;
}>({
  ...initialState,
  dispatch: () => null,
});

const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [token, setToken] = useLocalStorage('token');

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const token = window.localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        const info = parseJwt(token);
        const userId = info && info.sub;
        userId &&
          getUser(userId)
            .then((res) => {
              dispatch({ type: userActionTypes.SET_USER, payload: res });
              dispatch({
                type: userActionTypes.SET_USER_LOADING,
                payload: false,
              });
            })
            .catch((error) => {
              if (error.status === 401) {
                setToken(null);
                setIsAuthenticated(false);
              }
              // eslint-disable-next-line no-console
              console.log(error);
            });
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [dispatch, isAuthenticated, setIsAuthenticated, setToken, token]);

  return (
    <userInfoContext.Provider
      value={{ user: state.user, loading: state.loading, dispatch }}
    >
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfoProvider;
