import React, { createContext, useEffect, useReducer } from 'react';
import userReducer from './userReducer';
import { User } from '../../types';
import { useAuth, useLocalStorage } from '../../hooks';
import { getAccount, getUser, parseAccountResponseInfo, parseUserResponseInfo } from '../../utils';
import { userActionTypes } from './types';
import { UNAUTHORIZED } from '../../constants/status';
export interface UserInfoState {
  user: User | null;
  loading: boolean;
}

const initialState: UserInfoState = {
  user: null,
  loading: true,
};

export const userInfoContext = createContext<{
  user: User | null;
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
        getAccount(token)
          .then((account) => {
            const { userId } = parseAccountResponseInfo(account);
            getUser(userId, token).then((user) => {
              const parsedUserInfo = parseUserResponseInfo(user);
              dispatch({
                type: userActionTypes.SET_USER,
                payload: {
                  info: { ...parsedUserInfo },
                  account: { ...account },
                },
              });
              dispatch({
                type: userActionTypes.SET_USER_LOADING,
                payload: false,
              });
            });
          })
          .catch((error) => {
            if (error.status === UNAUTHORIZED) {
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
