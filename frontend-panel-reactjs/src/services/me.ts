import { http } from "utils";
import { GetProfileResponse } from "types";

class MeServices {
  uri = "/me";

  getProfile = async () => {
    return http.get<GetProfileResponse>(`${this.uri}/profile`);
  };
}

export default new MeServices();
