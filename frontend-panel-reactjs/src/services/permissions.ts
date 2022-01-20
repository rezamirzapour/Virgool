import { http } from 'utils';
import { CreatePermissionDto, GetPermissionsParams, GetPermissionParams, UpdatePermissionDto } from 'types';

export const PermissionsServices = {
    uri: "permissions",

    async findAll(params?: GetPermissionsParams) {
        return http.get(this.uri, { params })
    },

    async findOne(id: number) {
        return http.get(`${this.uri}/${id}`)
    },

    async create(data: CreatePermissionDto) {
        return http.post(this.uri, data)
    },

    async update(id: number, data: UpdatePermissionDto) {
        return http.put(`${this.uri}/${id}`, data)
    },

    async remove(id: number) {
        return http.delete(`${this.uri}/${id}`)
    },
} as const