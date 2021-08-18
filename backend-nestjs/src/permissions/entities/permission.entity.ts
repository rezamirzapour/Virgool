/* eslint-disable prettier/prettier */
import { Table, Model, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table({ tableName: 'permissions' })
export class Permission extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    title: string;
}
