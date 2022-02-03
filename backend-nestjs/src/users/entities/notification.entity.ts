/* eslint-disable prettier/prettier */
import { User } from './user.entity';
import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 'notificaions' })
export class Notification extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  message: string;

  @Column
  userId: number;

  @ForeignKey(() => User)
  user: User;
}
