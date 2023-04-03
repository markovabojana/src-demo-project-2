import { Product } from './product';

export interface Cart {
  id: number;
  products: Array<Product>;
}
