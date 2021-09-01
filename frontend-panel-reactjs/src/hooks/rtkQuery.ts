import { articlesApi, categoriesApi, rolesApi, permissionsApi } from 'store/services'

export const {
    useGetArticlesQuery,
    useGetArticleQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
    useGetPaginatedArticlesQuery,
} = articlesApi

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetPaginatedCategoriesQuery,
} = categoriesApi

export const {
    useGetRolesQuery,
    useGetRoleQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
    useGetPaginatedRolesQuery,
} = rolesApi

export const {
    useGetPermissionsQuery,
    useGetPermissionQuery,
    useCreatePermissionMutation,
    useUpdatePermissionMutation,
    useDeletePermissionMutation,
    useGetPaginatedPermissionsQuery,
} = permissionsApi
