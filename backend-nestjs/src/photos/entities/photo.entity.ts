/* eslint-disable prettier/prettier */
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

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

  @Column(DataType.VIRTUAL)
  get fullPath() {
    return `http://localhost:8000/api/photos/${this.id}`;
  }
}
