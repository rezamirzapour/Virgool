import { GetAllParams, GetOneParams, FindAllResponse, FindOneResponse } from '../common/common.services.interface';

export interface GetPermissionsParams extends GetAllParams {
    title?: string;
}

export interface GetPermissionParams extends GetOneParams { }

export interface CreatePermissionDto {
    title: string;
}

export interface UpdatePermissionDto extends CreatePermissionDto { }

export interface PermissionsResult {
    id: number;
    title: string;
}

export interface PermissionResult {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PermissionsResponse extends FindAllResponse<PermissionsResult> { }

export interface PermissionResponse extends FindOneResponse<PermissionResult> { }