import { User } from './user';

export interface Listing {
  id: string;
  image: string;
  listingName: string;
  cost: string;
  condition: string;
  description: string;
  user: User;
}
