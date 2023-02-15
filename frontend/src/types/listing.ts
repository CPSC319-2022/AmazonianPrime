import { User } from './user';

export interface Listing {
  id: string;
  images: string[];
  listingName: string;
  cost: string;
  condition: string;
  description: string;
  user: User;
}
