import { ListingPreview } from './listingPreview';

export interface ShoppingCartItem {
  ShoppingCartItemID?: number;
  UserID: number;
  ListingID: number;
  Listing?: ListingPreview;
  Quantity: number;
}
