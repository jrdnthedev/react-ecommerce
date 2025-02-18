export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export type Rating = {
  rate: number;
  count: number;
};

export type RegisterForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
