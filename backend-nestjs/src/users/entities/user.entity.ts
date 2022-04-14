/* eslint-disable prettier/prettier */
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  AllowNull,
  AutoIncrement,
  Unique,
  HasMany,
  ForeignKey,
  BelongsTo,
  Length,
  BelongsToMany,
  Default,
  BeforeCreate,
} from 'sequelize-typescript';
import {
  Article,
  Photo,
  Following,
  Role,
  Notification,
} from 'src/database/database.entities';
import { hash } from 'bcrypt';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column
  email: string;

  @Length({ min: 8 })
  @Column
  password: string;

  @Length({ max: 128 })
  @Column
  firstName: string;

  @Length({ max: 128 })
  @Column
  lastName: string;

  @Unique
  @AllowNull
  @Length({ min: 11, max: 11 })
  @Column
  phoneNumber?: string;

  @AllowNull
  @Column
  description?: string;

  @Default(false)
  @Column
  isEmailVerified: boolean;

  @Default(false)
  @Column
  isPhoneNumberVerified: boolean;

  @HasMany(() => Article)
  articles: Article[];

  @ForeignKey(() => Photo)
  @AllowNull
  @Column
  avatarId: number;

  @BelongsTo(() => Photo)
  avatar: Photo;

  @BelongsToMany(() => User, () => Following, 'followerId')
  followings: User[];

  @BelongsToMany(() => User, () => Following, 'followingId')
  followers: User[];

  @ForeignKey(() => Role)
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Notification)
  notifications: Notification[];

  @BeforeCreate
  public static async hashPassword(user: User) {
    user.password = await hash(user.password, 10);
  }
}
