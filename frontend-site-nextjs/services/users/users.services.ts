import { http } from 'utils';
import { GetUsersParms, UsersResponse, UserResponse } from './types';
import { CrudServices } from '../common.services'
export const UsersServices = new class implements CrudServices {
    url = '/users';

    async findAll<UsersResponse>(params?: GetUsersParms) {
        console.log(params)
        return http.get<UsersResponse>(this.url, { params })
    }

    async findOne<UserResponse>(id: number) {
        return http.get<UserResponse>(`${this.url}/${id}`)
    }

    async remove(id: number) {
        return http.delete(`${this.url}/${id}`);
    }

    async findOneByEmail<UserResponse>(email: string) {
        return http.get<UserResponse>(this.url, { params: { email } })
    }
}()