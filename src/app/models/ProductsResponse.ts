import { Product } from './product';

export interface ProductsResponse {
  products: Array<Product>;
  limit: number;
  skip: number;
  total: number;
}
