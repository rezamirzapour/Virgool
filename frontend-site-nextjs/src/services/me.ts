import { http } from "src/utils";
import type { GetProfileResponse, UpdateProfileDto } from "src/types";
import { AxiosRequestConfig } from "axios";

export class MeServices {
  static uri = "/me";

  static getProfile = async (config?: AxiosRequestConfig) => {
    return http.get<GetProfileResponse>(`${this.uri}/profile`, config);
  };

  static updateProfile = (
    data: UpdateProfileDto,
    config?: AxiosRequestConfig
  ) => {
    return http.put(`${this.uri}/profile`, data, config);
  };
}
