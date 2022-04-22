import { http } from "src/utils";
import type {
  LoginDto,
  RegisterDto,
  LoginResponsePayload,
  RegisterResponsePayload,
} from "types";

export class AuthServices {
  static uri = "/auth";

  static login = async (data: LoginDto) => {
    return http
      .post<LoginResponsePayload>(`${this.uri}/login`, data)
      .then(({ data }) => data);
  };

  static register = async (data: RegisterDto) => {
    return http.post<RegisterResponsePayload>(`${this.uri}/register`, data);
  };
}
