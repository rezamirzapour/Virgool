import { http } from "utils";
import {
  CreatePermissionDto,
  GetPermissionsParams,
  GetPermissionParams,
  UpdatePermissionDto,
} from "types";

class PermissionsServices {
  uri = "permissions";

  findAll = async (params?: GetPermissionsParams) => {
    return http.get(this.uri, { params });
  };

  findOne = async (id: number) => {
    return http.get(`${this.uri}/${id}`);
  };

  create = async (data: CreatePermissionDto) => {
    return http.post(this.uri, data);
  };

  update = async (id: number, data: UpdatePermissionDto) => {
    return http.put(`${this.uri}/${id}`, data);
  };

  remove = (id: number) => {
    return http.delete(`${this.uri}/${id}`);
  };
}

export default new PermissionsServices();
