import { Order } from './order';

export interface PaginatedOrders {
  TotalOrders: string;
  Data: Order[];
}
