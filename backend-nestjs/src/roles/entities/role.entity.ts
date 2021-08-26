/* eslint-disable prettier/prettier */
import { PermissionRole, User } from 'database/database.entities';
import { Permission } from 'permissions/entities';
import { Table, Model, PrimaryKey, Column, AutoIncrement, Length, BelongsToMany, HasMany, Default } from 'sequelize-typescript'

@Table({ tableName: 'roles' })
export class Role extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Length({ max: 128 })
    @Column
    title: string

    @Length({ max: 128 })
    @Column
    label: string;

    @Default(false)
    @Column
    allowAny: boolean;

    @BelongsToMany(() => Permission, () => PermissionRole)
    permissions: Permission[]

    @HasMany(() => User)
    users: User[]
}
