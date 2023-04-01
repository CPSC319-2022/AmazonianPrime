import { OrderListings } from "./ordersListing";

export interface Order {
  OrderID: number;
  UserID: number;
  ShippingStatus: string;
  OrderTimestamp: string;
  Listings: 
  {
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
  }[]
}
