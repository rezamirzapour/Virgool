import { http } from 'utils';
import {
    GetProfileResponse,
} from './types';

export class MeServices {
    static url = '/me';

    static async getProfile() {
        return http.get<GetProfileResponse>(`${this.url}/profile`)
    }

}