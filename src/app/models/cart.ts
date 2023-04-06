import { Product } from './product';

export interface Cart {
  id: number;
  products: Array<Product>;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  isDeleted: boolean;
}
