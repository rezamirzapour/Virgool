import { createApi } from '@reduxjs/toolkit/query/react'
import { RolesServices } from 'services';
import type {
    RolesResult,
    CreateRoleDto,
    GetRolesParms,
    UpdateRoleDto,
    RoleResult,
} from 'types';

import baseQuery from './baseQuery'

export const rolesApi = createApi({
    baseQuery,
    reducerPath: 'roles',
    tagTypes: ['roles', 'role'],
    endpoints: (build) => ({
        getRoles: build.query<RolesResult[], GetRolesParms>({
            query: (params?) => ({
                httpService: () => RolesServices.findAll({ ...params, paginate: false }),
                type: 'FIND_ALL'
            }),
            providesTags: ['roles']
        }),
        getPaginatedRoles: build.query<RolesResult[], GetRolesParms>({
            query: (params?) => ({
                httpService: () => RolesServices.findAll({ ...params, paginate: true }),
                type: 'PAGINATE'
            }),
        }),
        getRole: build.query<RoleResult, number>({
            query: (id) => ({
                httpService: () => RolesServices.findOne(id),
                type: 'FIND_ONE'
            }),
            providesTags: (_, __, id) => [{ type: 'role', id }],
        }),
        createRole: build.mutation<any, CreateRoleDto>({
            query: (data) => ({
                httpService: () => RolesServices.create(data),
                type: 'CREATE'
            }),
            invalidatesTags: ['roles']
        }),
        updateRole: build.mutation<any, { id: number, data: UpdateRoleDto }>({
            query: ({ id, data }) => ({
                httpService: () => RolesServices.update(id, data),
                type: 'UPDATE'
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'role', id }],
        }),
        deleteRole: build.mutation<any, number>({
            query: (id) => ({
                httpService: () => RolesServices.remove(id),
                type: 'DELETE'
            }),
            invalidatesTags: (_, __, id) => [{ type: 'role', id }]
        }),
    })
})
