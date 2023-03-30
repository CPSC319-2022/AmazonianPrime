import { ShoppingCartItem } from './shoppingCartItem';

export interface ShoppingCartItems {
  TotalQuantity: number;
  Items: ShoppingCartItem[];
  PSTTax: number;
  GSTTax: number;
  Subtotal: number;
  TotalCost: number;
}
