
import { CardResponse, UserReponse, AccountResponse, TransactionResponse } from './types';

const myInit = (method = 'GET', token?: string) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `${token?.replace(/['"]+/g, '')}` : '',
    },
    mode: 'cors' as RequestMode,
    cache: 'default' as RequestCache,
  };
};

const myRequest = (endpoint: string, method: string, token?: string) =>
  new Request(endpoint, myInit(method, token));

// create and .env file and add the following line:
// REACT_APP_API_URL='your api url'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// remove this one when backend is ready
const baseUrl = 'http://localhost:3500';

const rejectPromise = (response?: Response): Promise<Response> =>
  Promise.reject({
    status: (response && response.status) || '00',
    statusText: (response && response.statusText) || 'Ocurrió un error',
    err: true,
  });

export const login = (email: string, password: string) => {
  return fetch(myRequest(`${API_BASE_URL}/login`, 'POST'), {
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return rejectPromise(response);
    })
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const createUser = (user: any) => {
  return fetch(myRequest(`${API_BASE_URL}/users`, 'POST'), {
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return rejectPromise(response);
    })
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const getUser = (id: number, token?: string): Promise<UserReponse> => {
  return fetch(myRequest(`${API_BASE_URL}/users/${id}`, 'GET', token))
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const updateUser = (
  id: string,
  data: any,
  token: string
): Promise<Response> => {
  return fetch(myRequest(`${API_BASE_URL}/users/${id}`, 'PATCH', token), {
    body: JSON.stringify(data),
  })
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const getAccount = (token: string): Promise<AccountResponse> => {
  return fetch(myRequest(`${API_BASE_URL}/account`, 'GET', token))
    .then((response) => {
      if (response.ok) {
        return response.json().then((account) => account);
      }
      return rejectPromise(response);
    })
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const getAccounts = (): Promise<AccountResponse[]> => {
  return fetch(myRequest(`${baseUrl}/accounts`, 'GET'))
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const updateAccount = (
  accountId: number,
  data: any,
  token: string
): Promise<AccountResponse> => {
  return fetch(myRequest(`${API_BASE_URL}/accounts/${accountId}`, 'PATCH', token), {
    body: JSON.stringify(data),
  })
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const getUserActivities = (
  accountId: number,
  token: string,
  limit?: number
): Promise<TransactionResponse[]> => {
  return fetch(
    myRequest(
      `${API_BASE_URL}/accounts/${accountId}/activity${
        limit ? `?_limit=${limit}` : ''
      }`,
      'GET',
      token
    )
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return rejectPromise(response);
    })
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const getUserActivity = (
  accountId: number,
  activityId: string,
  token: string
): Promise<TransactionResponse> => {
  return fetch(
    myRequest(
      `${API_BASE_URL}/accounts/${accountId}/activities/${activityId}`,
      'GET',
      token
    )
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return rejectPromise(response);
    })
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const getUserCards = (
  accountId: number,
  token: string
): Promise<CardResponse[]> => {
  return fetch(
    myRequest(`${API_BASE_URL}/accounts/${accountId}/cards`, 'GET', token)
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return rejectPromise(response);
    })
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const getUserCard = (
  accountId: string,
  cardId: string
): Promise<CardResponse> => {
  return fetch(
    myRequest(`${API_BASE_URL}/accounts/${accountId}/cards/${cardId}`, 'GET')
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return rejectPromise(response);
    })
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const deleteUserCard = (
  accountId: number,
  cardId: string,
  token: string
): Promise<Response> => {
  return fetch(
    myRequest(
      `${API_BASE_URL}/accounts/${accountId}/cards/${cardId}`,
      'DELETE',
      token
    )
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return rejectPromise(response);
    })
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const createUserCard = (
  accountId: number,
  card: CardResponse,
  token: string
): Promise<Response> => {
  return fetch(
    myRequest(`${API_BASE_URL}/accounts/${accountId}/cards`, 'POST', token),
    {
      body: JSON.stringify(card),
    }
  )
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

// TODO: edit when backend is ready
export const createDepositActivity = (
  userId: number,
  amount: number,
  token: string
) => {
  const maxAmount = 30000;
  if (amount > maxAmount) return rejectPromise();

  const activity = {
    amount,
    type: 'Deposit',
    description: 'Depósito con tarjeta',
    dated: new Date(), // date must be genarated in backend
  };

  return fetch(
    myRequest(`${baseUrl}/users/${userId}/activities`, 'POST', token),
    {
      body: JSON.stringify(activity),
    }
  )
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

// TODO: edit when backend is ready
export const createTransferActivity = (
  userId: number,
  token: string,
  origin: string,
  destination: string,
  amount: number,
  name?: string
) => {
  return fetch(
    myRequest(`${baseUrl}/users/${userId}/activities`, 'POST', token),
    {
      body: JSON.stringify({
        type: 'Transfer',
        amount: amount * -1,
        origin,
        destination,
        name,
        dated: new Date(), // date must be genarated in backend
      }),
    }
  )
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};
