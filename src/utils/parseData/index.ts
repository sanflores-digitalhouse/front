import { IRecord, Transaction } from '../../components';

export const parseActivities = (activities: any): Transaction[] => {
  return activities.map((activity: any) => {
    const { name, amount, date, id } = activity;
    return {
      name,
      amount,
      date,
      id,
    };
  });
};

export const parseCards = (cards: any): any[] => {
  return cards.map((card: any) => {
    const { name, number, id, type } = card;
    return {
      name,
      number,
      id,
      type,
    };
  });
};

export const parseActivity = (activity: any): Transaction => {
  const { name, amount, date, id } = activity;
  return {
    name,
    amount,
    date,
    id,
  };
};

export const parseRecordContent = (record: any, variant: any): IRecord => {
  return {
    content: { ...record },
    variant,
  };
};
