import { http } from "src/utils";
import type {
  RolesResponse,
  RoleResponse,
  GetRolesParms,
  GetRoleParms,
  CreateRoleDto,
  UpdateRoleDto,
} from "src/types";

export class RolesServices {
  static uri = "/roles";

  static findAll = async (params?: GetRolesParms) => {
    return http.get<RolesResponse>(this.uri, { params });
  };

  static findOne = async (id: number, params?: GetRoleParms) => {
    return http.get<RoleResponse>(`${this.uri}/${id}`, { params });
  };

  static create = async (data: CreateRoleDto) => {
    return http.post<any>(this.uri, data);
  };

  static update = async (id: number, data: UpdateRoleDto) => {
    return http.put<any>(`${this.uri}/${id}`, data);
  };

  static remove = async (id: number) => {
    return http.delete<any>(`${this.uri}/${id}`);
  };
}
