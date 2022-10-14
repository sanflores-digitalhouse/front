import React, { createContext, useReducer } from 'react';
import userReducer from './userReducer';
import { User } from '../../types';
export interface UserInfoState {
  user: User;
  loading: boolean;
}

const initialState = {
  user: {} as User,
  loading: false,
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

  return (
    <userInfoContext.Provider
      value={{ user: state.user, loading: state.loading, dispatch }}
    >
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfoProvider;
