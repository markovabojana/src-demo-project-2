import { User } from './user';

export interface UsersResponse {
  users: Array<User>;
  limit: number;
  skip: number;
  total: number;
}
