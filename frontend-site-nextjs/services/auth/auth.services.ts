import { http } from 'utils';
import {
    LoginDto,
    RegisterDto,
    LoginResponsePayload,
    GetProfileResponse,
    RegisterResponsePayload
} from './types';

export class AuthServices {
    static url = '/auth';

    static async login(data: LoginDto) {
        return http.post<LoginResponsePayload>(`${this.url}/login`, data)
    }

    static async register(data: RegisterDto) {
        return http.post<RegisterResponsePayload>(`${this.url}/register`, data)
    }

    static async getProfile() {
        return http.get<GetProfileResponse>(`${this.url}/profile`)
    }

}