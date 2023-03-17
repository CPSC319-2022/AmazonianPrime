import { User } from './user';

export interface Listing {
  ListingID: number;
  UserID: number;
  User: User;
  ListingName: string;
  Description: string;
  Cost: number;
  Quantity: number;
  Category: string;
  ItemCondition: string;
  PostedTimestamp: string;
  IsActiveListing: boolean;
  Brand?: string;
  Colour?: string;
  Size?: string;
  Images: string[];
}
