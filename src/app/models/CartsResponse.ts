import { Cart } from './cart';

export interface CartsResponse {
  carts: Array<Cart>;
  limit: number;
  skip: number;
  total: number;
}
