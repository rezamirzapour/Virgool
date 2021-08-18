import { http } from 'utils';
import { RolesResponse, RoleResponse, GetRolesParms, GetRoleParms, CreateRoleDto, UpdateRoleDto } from './types';
import { CrudServices } from '../common'
export const RolesServices = new class implements CrudServices {
    uri = "/roles";

    public async findAll<RolesResponse>(params?: GetRolesParms) {
        return http.get<RolesResponse>(this.uri, { params });
    }

    public async findOne<RoleResponse>(id: number, params?: GetRoleParms) {
        return http.get<RoleResponse>(`${this.uri}/${id}`, { params });
    }

    public async create<CreateRoleDto>(data: CreateRoleDto) {
        return http.post<any>(this.uri, data);
    }

    public async update<UpdateRoleDto>(id: number, data: UpdateRoleDto) {
        return http.put<any>(`${this.uri}/${id}`, data);
    }

    public async remove(id: number) {
        return http.delete<any>(`${this.uri}/${id}`);
    }
}()