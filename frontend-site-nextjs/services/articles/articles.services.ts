import { http } from 'utils';
import { GetArticlesParms, ArticlesResponse, CreateArticleDto, ArticleResponse } from './types';
import { CrudServices } from '../common.services';

export const ArticleServices = new class implements CrudServices {
    uri = '/articles';

    async findAll<ArticlesResponse, GetArticlesParms>(params?: GetArticlesParms) {
        return http.get<ArticlesResponse>(this.uri, { params })
    }

    async findOne<ArticleResponse>(id: number) {
        return http.get<ArticleResponse>(`${this.uri}/${id}`)
    }

    async create<CreateArticleDto>(data: CreateArticleDto) {
        return http.post(this.uri, data);
    }

    async update(id: number, data: Partial<CreateArticleDto>) {
        return http.put(`${this.uri}/${id}`, data);
    }

    async remove(id: number) {
        return http.delete(`${this.uri}/${id}`);
    }
}()