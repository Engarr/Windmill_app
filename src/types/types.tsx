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
  newPassword?: string;
  repeatPassword?: string;
  name?: string;
  price?: string;
  category?: string;
  description?: string;
  image?: string;
  newEmail?: string;
  userName?: string;
  message?: string;
  subject?: string;
  code?: string;
  user?: string;
  oldPassword?: string;
};
export type ErrorOrderPageType = {
  name?: string;
  surname?: string;
  companyName?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  message?: string;
  status?: boolean;
};
export type OrderDataType = {
  name: string;
  surname: string;
  companyName: string;
  city: string;
  street: string;
  zipCode: string;
  phone: string;
  email: string;
  message: string;
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
  quantity: number;
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
      message: string;
    };
  };
  data: {
    email: string;
    token: string;
    userId: string;
    orderId: string;
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

export type FormResponseType = {
  data: {
    message: string;
  };
  error: {
    data: {
      errors: Data[];
    };
    status: number;
  };
};
export type ResetPasswordResponseType = {
  data: {
    userId: string;
    message: string;
  };
  error: {
    data: {
      errors: Data[];
      message: string;
    };
    status: number;
  };
};
export type OrderType = {
  city: string;
  companyName: string;
  date: string;
  deliveryMethod: {
    name: string;
    price: number;
    _id: string;
  };
  email: string;
  message: string;
  name: string;
  surname: string;
  paid: boolean;
  paymentMethod: string;
  phone: string;
  products: ProductType[];
  street: string;
  user: {
    email: string;
    userId: string;
  };
  zipCode: string;
  _id: string;
};
