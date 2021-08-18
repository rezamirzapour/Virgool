
import { GetAllParams, GetOneParams } from '../common/common.services.interface';

export interface GetRolesParms extends GetAllParams {
    title?: string;
}

export interface GetRoleParms extends GetOneParams { }

export interface RolesPayloadResponse {
    id: number;
    title: string;
    label: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RolePayloadResponse {
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

export interface RolesResponse {
    result: RolesPayloadResponse[];
    count: number;
    message: string;
}

export interface RoleResponse {
    result: RolePayloadResponse;
    count: number;
    message: string;
}

export interface CreateRoleDto {
    title: string;
    label: string;
    permissions: number[]
}

export interface UpdateRoleDto extends CreateRoleDto { }