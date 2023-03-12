import { User } from './user';

export interface Listing {
  ListingID: number;
  UserID: number;
  // TODO: change after michael
  User?: any;
  ListingName: string;
  Description: string;
  Cost: number;
  Quantity: number;
  Category: string;
  ItemCondition: string;
  PostedTimestamp: string;
  IsActiveListing: boolean;
  Images: string[];
}
