import { ListingPreview } from './listingPreview';

export interface Order {
  OrderID: number;
  UserID: number;
  AddressID: number;
  PaymentID: number;
  ShippingStatus: string;
  OrderTimestamp: string;
  PurchaseAmount: null;
  GSTTax: null;
  PSTTax: null;
  TotalAmount: null;
}
