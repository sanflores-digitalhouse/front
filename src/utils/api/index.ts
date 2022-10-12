import { UserAccount, User } from '../../types';

const myInit = (method = 'GET') => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
  };
};
const myRequest = (endpoint: string, method: string) =>
  new Request(endpoint, myInit(method));
const baseUrl = 'http://localhost:3500';

const rejectPromise = (response: Response) =>
  Promise.reject({
    status: response.status || '00',
    statusText: response.statusText || 'Ocurrió un error',
    err: true,
  });

export const getUser = (id: string): Promise<User> => {
  return fetch(myRequest(`${baseUrl}/users/${id}`, 'GET'))
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => err);
};

export const updateUser = (id: string, data: any): Promise<Response> => {
  return fetch(myRequest(`${baseUrl}/users/${id}`, 'PATCH'), {
    body: JSON.stringify(data),
  })
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => err);
};

export const getAccount = (id: string): Promise<UserAccount> => {
  return fetch(myRequest(`${baseUrl}/accounts/${id}`, 'GET'))
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => err);
};

export const getAccounts = (): Promise<UserAccount[]> => {
  return fetch(myRequest(`${baseUrl}/accounts`, 'GET'))
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => err);
};

export const updateAccount = (id: string, data: any): Promise<Response> => {
  return fetch(myRequest(`${baseUrl}/users/${id}/accounts/1`, 'PATCH'), {
    body: JSON.stringify(data),
  })
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => err);
};

export const getUserActivities = async (userId: string) => {
  try {
    const response = await fetch(
      myRequest(`${baseUrl}/activities?userId=${userId}`, 'GET')
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserActivity = async (userId: string, activityId: string) => {
  try {
    const response = await fetch(
      myRequest(`${baseUrl}/users/${userId}/activities/${activityId}`, 'GET')
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserCards = async (userId: string) => {
  try {
    const response = await fetch(
      myRequest(`${baseUrl}/users/${userId}/cards`, 'GET')
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getUserCard = async (userId: string, cardId: string) => {
  try {
    const response = await fetch(
      myRequest(`${baseUrl}/users/${userId}/cards/${cardId}`, 'GET')
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUserCard = async (userId: string, cardId: string) => {
  try {
    const response = await fetch(
      myRequest(`${baseUrl}/users/${userId}/cards/${cardId}`, 'DELETE')
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const createUserCard = (
  userId: string,
  card: any
): Promise<Response> => {
  return fetch(myRequest(`${baseUrl}/users/${userId}/cards`, 'POST'), {
    body: JSON.stringify(card),
  })
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => err);
};

export const createTransferActivity = (
  userId: string,
  origin: string,
  destination: string,
  amount: number,
) => {
  fetch(myRequest(`${baseUrl}/users/${userId}/activities`, 'POST'), {
    body: JSON.stringify({
      type: 'Transfer',
      amount: amount,
      origin,
      destination,
    }),
  })
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => err);
};
