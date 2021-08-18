import { GetAllParams, GetOneParams } from '../common.services/common.services.interface';

export interface GetAllPermissionsParams extends GetAllParams {
    title?: string;
}

export interface GetOnePermisionParams extends GetOneParams { }

export interface CreatePermissionDto {
    title: string;
}

export interface UpdatePermissionDto extends CreatePermissionDto { }

export interface PermissionsPayload {
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PermissionPayload {
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PermissoinsResponse {
    result: PermissionsPayload[];
    count: number;
    message: string;
}

export interface PermissoinResponse {
    result: PermissionPayload;
    count: number;
    message: string;
}