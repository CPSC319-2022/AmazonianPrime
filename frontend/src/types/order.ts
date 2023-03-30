import { ListingPreview } from "./listingPreview";

export interface Order {
    OrderID: number;
    UserID: number;
    ListingID?: number;
    Listing?: ListingPreview;
    Quantity: number;
    DeliveryMethod: string;
    Delivered: boolean;
  }

  