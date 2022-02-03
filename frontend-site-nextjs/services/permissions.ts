import { http } from "utils";
import {
  CreatePermissionDto,
  GetPermissionsParams,
  GetPermissionParams,
  UpdatePermissionDto,
} from "types";

export class PermissionsServices {
  static uri = "permissions";

  static findAll = async (params?: GetPermissionsParams) => {
    return http.get(this.uri, { params });
  };

  static findOne = async (id: number) => {
    return http.get(`${this.uri}/${id}`);
  };

  static create = async (data: CreatePermissionDto) => {
    return http.post(this.uri, data);
  };

  static update = async (id: number, data: UpdatePermissionDto) => {
    return http.put(`${this.uri}/${id}`, data);
  };

  static remove = (id: number) => {
    return http.delete(`${this.uri}/${id}`);
  };
}
