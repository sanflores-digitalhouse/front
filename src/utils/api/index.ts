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

export const createUserCard = async (userId: string, card: any) => {
  try {
    const response = await fetch(
      myRequest(`${baseUrl}/users/${userId}/cards`, 'POST'),
      {
        body: JSON.stringify(card),
      }
    );
    if (!response.ok) {
      const errorMessage = await response.text();

      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
