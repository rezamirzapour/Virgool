/* eslint-disable prettier/prettier */
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
} from 'sequelize-typescript';
import { Role, User } from 'database/database.entities';
@Table({ tableName: 'roleUser' })
export class RoleUser extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
