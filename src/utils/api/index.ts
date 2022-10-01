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
  const activities: any[] = await getAllActivities();
  const userActivities = activities.find((activity) =>
    activity.id === userId ? activity : null
  ).activities;
  const userActivity = userActivities.find(
    (activity: any) => activity.activity_id === activityId
  );
  return userActivity;
};
