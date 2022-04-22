import { http } from "src/utils";
import type { GetUsersParms, UsersResponse, UserResponse } from "src/types";
export class UsersServices {
  static uri = "/users";

  static findAll = async (params?: GetUsersParms) => {
    return http.get<UsersResponse>(this.uri, { params });
  };

  static findOne = async (id: number) => {
    return http.get<UserResponse>(`${this.uri}/${id}`);
  };

  static remove = async (id: number) => {
    return http.delete(`${this.uri}/${id}`);
  };

  static findOneByEmail = async (email: string) => {
    return http.get<UserResponse>(this.uri, { params: { email } });
  };
}
