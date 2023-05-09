export type Data = {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
};
export type ErrorsData = {
  email?: string;
  password?: string;
  repeatPassword?: string;
  name?: string;
  price?: string;
  category?: string;
  description?: string;
  image?: string;
};

export type Products = {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
};

export type ProductType = {
  category: string;
  creator: string;
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  _id: string;
};
