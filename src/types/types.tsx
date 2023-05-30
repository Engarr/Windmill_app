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
export type CartProductType = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type CartItemsResponse = {
  prodArr: {
    product: ProductType;
    quantity: number;
  }[];
};

export type ResponseType = {
  error: {
    status: number;
    data: {
      errors: Data[];
    };
  };
  data: {
    email: string;
    token: string;
    userId: string;
  };
};

export type ProductFormResponseType = {
  data?: {
    data: ProductType;
    message: string;
  };
  error?: {
    data: {
      errors: Data[];
    };
    status: number;
  };
};
