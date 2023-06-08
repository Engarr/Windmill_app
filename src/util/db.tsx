interface ShippingType {
  name: string;
  price: number;
  option: number;
}

// eslint-disable-next-line import/prefer-default-export
export const shippingCost: ShippingType[] = [
  {
    name: 'Kurier DPD',
    price: 19.99,
    option: 0,
  },
  {
    name: 'Kurier DHL',
    price: 21.99,
    option: 1,
  },
  {
    name: 'Paczkomat InPost',
    price: 14.99,
    option: 2,
  },
];

