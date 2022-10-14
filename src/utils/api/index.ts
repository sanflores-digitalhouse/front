import { UserAccount, User, Transaction, Card } from '../../types';

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

const rejectPromise = (response: Response): Promise<Response> =>
  Promise.reject({
    status: response.status || '00',
    statusText: response.statusText || 'Ocurrió un error',
    err: true,
  });

export const createAnUser = (user: User) => {
  return fetch(myRequest(`${baseUrl}/register`, 'POST'), {
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

export const login = (email: string, password: string) => {
  return fetch(myRequest(`${baseUrl}/login`, 'POST'), {
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

export const getUser = (id: string): Promise<User> => {
  return fetch(myRequest(`${baseUrl}/users/${id}`, 'GET'))
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
  return fetch(myRequest(`${baseUrl}/users/${id}`, 'PATCH'), {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const getAccount = (id: string, token: string): Promise<UserAccount> => {
  return fetch(myRequest(`${baseUrl}/users/${id}/accounts`, 'GET'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json().then((account) => account[0]);
      }
      return rejectPromise(response);
    })
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const getAccounts = (): Promise<UserAccount[]> => {
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
  id: string,
  data: any,
  token: string
): Promise<Response> => {
  return fetch(myRequest(`${baseUrl}/users/${id}/accounts/1`, 'PATCH'), {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
  userId: string,
  token: string,
  limit?: number
): Promise<Transaction[]> => {
  return fetch(
    myRequest(
      `${baseUrl}/users/${userId}/activities${limit ? `?_limit=${limit}` : ''}`,
      'GET'
    ),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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
  userId: string,
  activityId: string,
  token: string
): Promise<Transaction> => {
  return fetch(
    myRequest(`${baseUrl}/users/${userId}/activities/${activityId}`, 'GET'),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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
  userId: string,
  token: string
): Promise<Card[]> => {
  return fetch(myRequest(`${baseUrl}/users/${userId}/cards`, 'GET'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const getUserCard = (userId: string, cardId: string): Promise<Card> => {
  return fetch(myRequest(`${baseUrl}/users/${userId}/cards/${cardId}`, 'GET'))
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
  userId: string,
  cardId: string,
  token: string
): Promise<Response> => {
  return fetch(
    myRequest(`${baseUrl}/users/${userId}/cards/${cardId}`, 'DELETE'),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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
  userId: string,
  card: any,
  token: string
): Promise<Response> => {
  return fetch(myRequest(`${baseUrl}/users/${userId}/cards`, 'POST'), {
    body: JSON.stringify(card),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) =>
      response.ok ? response.json() : rejectPromise(response)
    )
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};

export const createTransferActivity = (
  userId: string,
  origin: string,
  destination: string,
  amount: number
): Promise<Response> => {
  return fetch(myRequest(`${baseUrl}/users/${userId}/activities`, 'POST'), {
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
    .catch((err) => {
      console.log(err);
      return rejectPromise(err);
    });
};
