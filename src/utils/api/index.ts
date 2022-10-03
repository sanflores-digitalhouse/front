const myInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  mode: 'cors' as RequestMode,
  cache: 'default' as RequestCache,
};
const myRequest = (api: string) => new Request(api, myInit);

const getAllActivities = async () => {
  // fake delay
  const delay = Math.floor(Math.random() * 1000);
  await new Promise((resolve) => setTimeout(resolve, delay));
  const response = await fetch(myRequest('./data/activities.json'));
  const data = await response.json();
  return data;
};

export const getUserActivities = async (userId: string) => {
  const activities: any[] = await getAllActivities();
  const userActivities = activities.find((activity) =>
    activity.id === userId ? activity : null
  ).activities;
  return userActivities;
};

export const getUserActivity = async (userId: string, activityId: string) => {
  const userActivities = await getUserActivities(userId);
  const userActivity = userActivities.find(
    (activity: any) => activity.id === activityId
  );
  return userActivity;
};

export const getAllCards = async () => {
  const response = await fetch(myRequest('./data/cards.json'));
  const data = await response.json();
  return data;
};

export const getUserCards = async (userId: string) => {
  const cards: any[] = await getAllCards();
  const userCards = cards.find((card) =>
    card.id === userId ? card : null
  ).cards;
  return userCards;
};

export const getUserCard = async (userId: string, cardId: string) => {
  const userCards = await getUserCards(userId);
  const userCard = userCards.find((card: any) => card.id === cardId);
  return userCard;
};
