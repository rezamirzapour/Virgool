import { http } from 'utils';
import { GetArticlesParms, ArticlesResponse, CreateArticleDto, ArticleResponse, UpdateArticleDto } from 'types';

export const ArticleServices = {
    uri: '/articles',

    async findAll(params?: GetArticlesParms) {
        return http.get<ArticlesResponse>(this.uri, { params })
    },

    async findOne(id: number) {
        return http.get<ArticleResponse>(`${this.uri}/${id}`)
    },

    async create(data: CreateArticleDto) {
        return http.post(this.uri, data);
    },

    async update(id: number, data: UpdateArticleDto) {
        return http.put(`${this.uri}/${id}`, data);
    },

    async remove(id: number) {
        return http.delete(`${this.uri}/${id}`);
    },
} as const