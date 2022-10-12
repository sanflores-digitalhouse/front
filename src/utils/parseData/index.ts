import { IRecord } from '../../components';
import { Transaction, Card } from '../../types/';

export const parseActivities = (activities: Transaction[]): Transaction[] => {
  return activities.map((activity: any) => {
    const { name, amount, dated, id, type, origin } = activity;
    return {
      name,
      amount,
      dated,
      id,
      type,
      origin,
    };
  });
};

export const parseActivity = (activity: Transaction): Transaction => {
  const { name, amount, dated, id, type, origin } = activity;
  return {
    name,
    amount,
    dated,
    id,
    type,
    origin,
  };
};

export const parseCards = (cards: Card[]): Card[] => {
  return cards.map((card: Card) => {
    const { name, number, id, type } = card;
    return {
      name,
      number,
      id,
      type,
    };
  });
};

export const parseRecordContent = (record: any, variant: any): IRecord => {
  return {
    content: { ...record },
    variant,
  };
};
