import { User } from './user';

export interface PaginatedUsers {
  TotalListings: string;
  Data: User[];
}
