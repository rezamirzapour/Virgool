/* eslint-disable prettier/prettier */
import { Table, Model, PrimaryKey, Column, CreatedAt, UpdatedAt, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'photos' })
export class Photo extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    path: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}