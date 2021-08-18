import { GetAllParams, GetOneParams } from '../common/common.services.interface';

export interface GetPermissionsParams extends GetAllParams {
    title?: string;
}

export interface GetPermissionParams extends GetOneParams { }

export interface CreatePermissionDto {
    title: string;
}

export interface UpdatePermissionDto extends CreatePermissionDto { }

export interface PermissionsPayload {
    id: number;
    title: string;
}

export interface PermissionPayload {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PermissionsResponse {
    result: PermissionsPayload[];
    count: number;
    message: string;
}

export interface PermissionResponse {
    result: PermissionPayload;
    count: number;
    message: string;
}