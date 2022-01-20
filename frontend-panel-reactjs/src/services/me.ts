import { http } from 'utils';
import {
    GetProfileResponse,
} from 'types';

export const MeServices = {
    uri: '/me',

    async getProfile() {
        return http.get<GetProfileResponse>(`${this.uri}/profile`)
    }
} as const