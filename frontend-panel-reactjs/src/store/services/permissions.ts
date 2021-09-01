import { createApi } from '@reduxjs/toolkit/query/react'
import {
    PermissionsServices,
    PermissionsResult,
    PermissionResult,
    CreatePermissionDto,
    GetPermissionsParams,
    UpdatePermissionDto,
} from 'services';
import baseQuery from './baseQuery'

export const permissionsApi = createApi({
    baseQuery,
    reducerPath: 'permissions',
    tagTypes: ['permissions', 'permission'],
    endpoints: (build) => ({
        getPermissions: build.query<PermissionsResult[], GetPermissionsParams>({
            query: (params?) => ({
                httpService: () => PermissionsServices.findAll({ ...params, paginate: false }),
                type: 'FIND_ALL'
            }),
            providesTags: ['permissions']
        }),
        getPaginatedPermissions: build.query<PermissionsResult[], GetPermissionsParams>({
            query: (params?) => ({
                httpService: () => PermissionsServices.findAll({ ...params, paginate: true }),
                type: 'PAGINATE'
            }),
        }),
        getPermission: build.query<PermissionResult, number>({
            query: (id) => ({
                httpService: () => PermissionsServices.findOne(id),
                type: 'FIND_ONE'
            }),
            providesTags: (_, __, id) => [{ type: 'permission', id }],
        }),
        createPermission: build.mutation<any, CreatePermissionDto>({
            query: (data) => ({
                httpService: () => PermissionsServices.create(data),
                type: 'CREATE'
            }),
            invalidatesTags: ['permissions']
        }),
        updatePermission: build.mutation<any, { id: number, data: UpdatePermissionDto }>({
            query: ({ id, data }) => ({
                httpService: () => PermissionsServices.update(id, data),
                type: 'UPDATE'
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'permission', id }],
        }),
        deletePermission: build.mutation<any, number>({
            query: (id) => ({
                httpService: () => PermissionsServices.remove(id),
                type: 'DELETE'
            }),
            invalidatesTags: (_, __, id) => [{ type: 'permission', id }]
        }),
    })
})
