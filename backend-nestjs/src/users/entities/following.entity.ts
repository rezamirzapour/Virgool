/* eslint-disable prettier/prettier */
import { Table, Model, ForeignKey, Column, BelongsTo } from 'sequelize-typescript'
import { User } from 'database/database.entities'
@Table({ tableName: 'following' })
export class Following extends Model {
    @ForeignKey(() => User)
    @Column
    followingId: number;

    @BelongsTo(() => User)
    following: User;

    @ForeignKey(() => User)
    @Column
    followerId: number;

    @BelongsTo(() => User)
    follower: User;
}