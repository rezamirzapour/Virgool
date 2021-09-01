import { createApi } from '@reduxjs/toolkit/query/react'
import {
    ArticleServices,
    CreateArticleDto,
    GetArticlesParms,
    UpdateArticleDto,
    ArticlesResult,
    ArticleResult
} from 'services';
import baseQuery from './baseQuery'

export const articlesApi = createApi({
    baseQuery,
    reducerPath: 'articles',
    tagTypes: ['articles', 'article'],
    endpoints: (build) => ({
        getArticles: build.query<ArticlesResult[], GetArticlesParms>({
            query: (params?) => ({
                httpService: () => ArticleServices.findAll({ ...params, paginate: false }),
                type: 'FIND_ALL'
            }),
            providesTags: ['articles']
        }),
        getPaginatedArticles: build.query<ArticlesResult[], GetArticlesParms>({
            query: (params?) => ({
                httpService: () => ArticleServices.findAll({ ...params, paginate: true }),
                type: 'PAGINATE'
            }),
        }),
        getArticle: build.query<ArticleResult, number>({
            query: (id) => ({
                httpService: () => ArticleServices.findOne(id),
                type: 'FIND_ONE'
            }),
            providesTags: (_, __, id) => [{ type: 'article', id }],
        }),
        createArticle: build.mutation<any, CreateArticleDto>({
            query: (data) => ({
                httpService: () => ArticleServices.create(data),
                type: 'CREATE'
            }),
            invalidatesTags: ['articles']
        }),
        updateArticle: build.mutation<any, { id: number, data: UpdateArticleDto }>({
            query: ({ id, data }) => ({
                httpService: () => ArticleServices.update(id, data),
                type: 'UPDATE'
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'article', id }],
        }),
        deleteArticle: build.mutation<any, number>({
            query: (id) => ({
                httpService: () => ArticleServices.remove(id),
                type: 'DELETE'
            }),
            invalidatesTags: (_, __, id) => [{ type: 'article', id }]
        }),
    })
})
