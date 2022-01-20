import { http } from 'utils';
import { RolesResponse, RoleResponse, GetRolesParms, GetRoleParms, CreateRoleDto, UpdateRoleDto } from 'types';

export const RolesServices = {
    uri: "/roles",

    async findAll(params?: GetRolesParms) {
        return http.get<RolesResponse>(this.uri, { params });
    },

    async findOne(id: number, params?: GetRoleParms) {
        return http.get<RoleResponse>(`${this.uri}/${id}`, { params });
    },

    async create(data: CreateRoleDto) {
        return http.post<any>(this.uri, data);
    },

    async update(id: number, data: UpdateRoleDto) {
        return http.put<any>(`${this.uri}/${id}`, data);
    },

    async remove(id: number) {
        return http.delete<any>(`${this.uri}/${id}`);
    },
} as const