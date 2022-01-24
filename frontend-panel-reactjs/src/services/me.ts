import { http } from "utils";
import { GetProfileResponse } from "types";

export class MeServices {
  static uri = "/me";

  static getProfile = async () => {
    return http.get<GetProfileResponse>(`${this.uri}/profile`);
  };
}
