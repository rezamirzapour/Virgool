/* eslint-disable prettier/prettier */
import { User } from 'src/database/database.entities';
export class UserFollowedEvent {
  constructor(public following: User, public follower: User) {}
}
