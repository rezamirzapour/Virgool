import { http } from "utils";
import {
  LoginDto,
  RegisterDto,
  LoginResponsePayload,
  RegisterResponsePayload,
} from "types";

class AuthServices {
  uri = "/auth";

  login = async (data: LoginDto) => {
    return http.post<LoginResponsePayload>(`${this.uri}/login`, data);
  };

  register = async (data: RegisterDto) => {
    return http.post<RegisterResponsePayload>(`${this.uri}/register`, data);
  };
}

export default new AuthServices();
