import { User } from './user';

export interface ListingPreview {
  id: string;
  imagePreview: string;
  listingName: string;
  cost: string;
  condition: string;
  description: string;
  user: User;
}
