/* eslint-disable prettier/prettier */
import { Column, ForeignKey, BelongsTo, Model, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript'
import { Role, Permission } from 'database/database.entities'

@Table({ tableName: 'permissionRole' })
export class PermissionRole extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => Role)
    roleId: number;

    @BelongsTo(() => Role)
    role: Role[]

    @ForeignKey(() => Permission)
    permissionId: number;

    @BelongsTo(() => Permission)
    permissoin: Permission;

}