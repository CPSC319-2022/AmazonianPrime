import { User } from './user';

export interface ListingPreview {
  id: string;
  imagePreview: string;
  listingName: string;
  cost: string;
  user: User;
}
