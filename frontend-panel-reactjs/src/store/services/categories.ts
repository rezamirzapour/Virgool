import { createApi } from '@reduxjs/toolkit/query/react'
import { CategoriesServices } from 'services';
import type {
    CreateCategoryDto,
    GetCategoriesParms,
    UpdateCategoryDto,
    CategoriesResult,
    CategoryResult
} from 'types';
import baseQuery from './baseQuery'

export const categoriesApi = createApi({
    baseQuery,
    reducerPath: 'categories',
    tagTypes: ['categories', 'category'],
    endpoints: (build) => ({
        getCategories: build.query<CategoriesResult[], GetCategoriesParms>({
            query: (params?) => ({
                httpService: () => CategoriesServices.findAll({ ...params, paginate: false }),
                type: 'FIND_ALL'
            }),
            providesTags: ['categories']
        }),
        getPaginatedCategories: build.query<CategoriesResult[], GetCategoriesParms>({
            query: (params?) => ({
                httpService: () => CategoriesServices.findAll({ ...params, paginate: true }),
                type: 'PAGINATE'
            }),
        }),
        getCategory: build.query<CategoryResult, number>({
            query: (id: number) => ({
                httpService: () => CategoriesServices.findOne(id),
                type: 'FIND_ONE'
            }),
            providesTags: (_, __, id) => [{ type: 'category', id }],
        }),
        createCategory: build.mutation<any, CreateCategoryDto>({
            query: (data) => ({
                httpService: () => CategoriesServices.create(data),
                type: 'CREATE'
            }),
            invalidatesTags: ['categories']
        }),
        updateCategory: build.mutation<any, { id: number, data: UpdateCategoryDto }>({
            query: ({ id, data }) => ({
                httpService: () => CategoriesServices.update(id, data),
                type: 'UPDATE'
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'category', id }],
        }),
        deleteCategory: build.mutation<any, number>({
            query: (id) => ({
                httpService: () => CategoriesServices.remove(id),
                type: 'DELETE'
            }),
            invalidatesTags: (_, __, id) => [{ type: 'category', id }]
        }),
    })
})