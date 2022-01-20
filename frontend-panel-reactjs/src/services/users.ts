import { http } from 'utils';
import { GetUsersParms, UsersResponse, UserResponse } from 'types';
export const UsersServices = {
    uri: '/users',

    async findAll(params?: GetUsersParms) {
        return http.get<UsersResponse>(this.uri, { params })
    },

    async findOne(id: number) {
        return http.get<UserResponse>(`${this.uri}/${id}`)
    },

    async remove(id: number) {
        return http.delete(`${this.uri}/${id}`);
    },

    async findOneByEmail(email: string) {
        return http.get<UserResponse>(this.uri, { params: { email } })
    },
} as const