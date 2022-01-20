import { http } from 'utils';
import {
    LoginDto,
    RegisterDto,
    LoginResponsePayload,
    RegisterResponsePayload
} from 'types';

export const AuthServices = {
    uri: '/auth',

    async login(data: LoginDto) {
        return http.post<LoginResponsePayload>(`${this.uri}/login`, data)
    },

    async register(data: RegisterDto) {
        return http.post<RegisterResponsePayload>(`${this.uri}/register`, data)
    },
} as const