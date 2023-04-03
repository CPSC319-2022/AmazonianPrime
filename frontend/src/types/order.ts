import { Address } from './address';
import { OrderListings } from './ordersListing';
import { Payment } from './payment';

export interface Order {
  OrderID: number;
  UserID: number;
  PSTTax: number | null;
  TotalAmount: number | null;
  GSTTax: number | null;
  ShippingStatus: string;
  OrderTimestamp: string;
  Shipping: Address;
  Payment: Payment;
  Listings: {
    OrderID: number;
    ListingID: number;
    OrderQuantity: number;
    UserID: number;
    ListingName: string;
    Description: string;
    Cost: number;
    Category: string;
    Size: string;
    Brand: string;
    Colour: string;
    ItemCondition: string;
    PostedTimestamp: string;
    IsActiveListing: number;
    ImageListingID: number;
    S3ImagePath: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Department: string;
    IsAdmin: boolean;
  }[];
}
