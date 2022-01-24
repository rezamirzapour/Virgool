import { http } from "utils";
import { GetUsersParms, UsersResponse, UserResponse } from "types";
class UsersServices {
  uri = "/users";

  findAll = async (params?: GetUsersParms) => {
    return http.get<UsersResponse>(this.uri, { params });
  };

  findOne = async (id: number) => {
    return http.get<UserResponse>(`${this.uri}/${id}`);
  };

  remove = async (id: number) => {
    return http.delete(`${this.uri}/${id}`);
  };

  findOneByEmail = async (email: string) => {
    return http.get<UserResponse>(this.uri, { params: { email } });
  };
}

export default new UsersServices();
