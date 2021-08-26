
import { GetAllParams, GetOneParams, FindAllResponse, FindOneResponse } from '../common/common.services.interface';

export interface GetRolesParms extends GetAllParams {
    title?: string;
}

export interface GetRoleParms extends GetOneParams { }

export interface RolesResult {
    id: number;
    title: string;
    label: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoleResult {
    id: number;
    title: string;
    label: string;
    createdAt: Date;
    updatedAt: Date;
    permissions: {
        id: number;
        title: string;
    }[]
}

export interface RolesResponse extends FindAllResponse<RolesResult> { }

export interface RoleResponse extends FindOneResponse<RoleResult> { }

export interface CreateRoleDto {
    title: string;
    label: string;
    permissions: number[]
}

export interface UpdateRoleDto extends CreateRoleDto { }