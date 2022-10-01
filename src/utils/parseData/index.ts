import { IRecord, Transaction } from '../../components';

export const parseActivities = (activities: any): Transaction[] => {
  return activities.map((activity: any) => {
    const { name, amount, date, activity_id } = activity;
    return {
      name,
      amount,
      date,
      id: activity_id,
    };
  });
};

export const parseActivity = (activity: any): Transaction => {
  const { name, amount, date, activity_id } = activity;
  return {
    name,
    amount,
    date,
    id: activity_id,
  };
};

export const parseRecordContent = (record: any, variant: any): IRecord => {
  return {
    content: { ...record },
    variant,
  };
};
