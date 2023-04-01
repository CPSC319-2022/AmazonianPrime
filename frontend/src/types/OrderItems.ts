import { Order } from './order';

export interface OrderItems {
  Items: Order[];
  TotalCost: number;
}
