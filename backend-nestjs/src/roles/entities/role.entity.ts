/* eslint-disable prettier/prettier */
import { PermissionRole, RoleUser, User } from 'database/database.entities';
import { Permission } from 'permissions/entities';
import { Table, Model, PrimaryKey, Column, AutoIncrement, Length, BelongsToMany } from 'sequelize-typescript'

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

    @BelongsToMany(() => Permission, () => PermissionRole)
    permissions: Permission[]


    @BelongsToMany(() => User, () => RoleUser)
    users: User[]
}
