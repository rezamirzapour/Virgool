import { http } from "utils";
import {
  RolesResponse,
  RoleResponse,
  GetRolesParms,
  GetRoleParms,
  CreateRoleDto,
  UpdateRoleDto,
} from "types";

class RolesServices {
  uri = "/roles";

  findAll = async (params?: GetRolesParms) => {
    return http.get<RolesResponse>(this.uri, { params });
  };

  findOne = async (id: number, params?: GetRoleParms) => {
    return http.get<RoleResponse>(`${this.uri}/${id}`, { params });
  };

  create = async (data: CreateRoleDto) => {
    return http.post<any>(this.uri, data);
  };

  update = async (id: number, data: UpdateRoleDto) => {
    return http.put<any>(`${this.uri}/${id}`, data);
  };

  remove = async (id: number) => {
    return http.delete<any>(`${this.uri}/${id}`);
  };
}

export default new RolesServices();
