import { User } from './user';

export interface PaginatedUsers {
  TotalUsers: string;
  Data: User[];
}
