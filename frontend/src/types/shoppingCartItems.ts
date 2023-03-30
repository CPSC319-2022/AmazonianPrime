import { ShoppingCartItem } from './shoppingCartItem';

export interface ShoppingCartItems {
  TotalQuantity: number;
  Items: ShoppingCartItem[];
  PSTTax: number | null;
  GSTTax: number | null;
  Subtotal: number | null;
  TotalCost: number | null;
}
