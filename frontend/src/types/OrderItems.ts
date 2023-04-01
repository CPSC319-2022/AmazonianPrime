import { Order } from './order';

export interface OrderItems {
    TotalQuantity: number;
    Items: Order[];
    TotalCost: number;
}
