export enum ActivityType {
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  INCOME = 'INCOME',
}
export const USER = {
  name: 'Mauricio',
  lastName: 'Brito',
  email: 'mau@gmail.com',
  password: '22Paradise**',
  phone: '1234567890',
  amount: '7000',
  currency: 'ARS',
  country: 'Argentina',
  city: 'Buenos Aires',
  activities: [
    {
      type: ActivityType.TRANSFER_IN,
      name: 'Aitana',
      amount: 3500.64,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.TRANSFER_OUT,
      name: 'Brendys',
      amount: 1895,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.INCOME,
      amount: 2000,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.TRANSFER_IN,
      name: 'Rodrigo',
      amount: 2000,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.TRANSFER_IN,
      name: 'Rodrigo',
      amount: 2000,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.TRANSFER_IN,
      name: 'Rodrigo',
      amount: 2000,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.TRANSFER_IN,
      name: 'Rodrigo',
      amount: 2000,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.TRANSFER_IN,
      name: 'Rodrigo',
      amount: 2000,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.TRANSFER_IN,
      name: 'Rodrigo',
      amount: 2000,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.TRANSFER_IN,
      name: 'Rodrigo',
      amount: 2000,
      date: '2022-09-17T20:57:38+00:00',
    },
    {
      type: ActivityType.TRANSFER_IN,
      name: 'Mauricio',
      amount: 2000,
      date: '2022-09-17T20:57:38+00:00',
    },
  ],
  cards: [
    {
      type: 'Debit',
      number: '1234567890',
      name: 'Mauricio Brito',
      expiration: '2022-09-17T20:57:38+00:00',
      cvv: '123',
    },
    {
      type: 'Debit',
      number: '1234567890',
      name: 'Mauricio Brito',
      expiration: '2022-09-17T20:57:38+00:00',
      cvv: '123',
    },
    {
      type: 'Debit',
      number: '1234567890',
      name: 'Mauricio Brito',
      expiration: '2022-09-17T20:57:38+00:00',
      cvv: '123',
    },
  ],
  accounts: [
    {
      name: 'John Esteban Doe Cia',
    },
    {
      name: 'Mauricio Brito',
    },
  ]
};
