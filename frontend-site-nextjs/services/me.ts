import { http } from "utils";
import { GetProfileResponse, UpdateProfileDto } from "types";

export class MeServices {
  static uri = "/me";

  static getProfile = async () => {
    return http.get<GetProfileResponse>(`${this.uri}/profile`);
  };

  static updateProfile = (data: UpdateProfileDto) => {
    return http.put(`${this.uri}/profile`, data);
  };
}
