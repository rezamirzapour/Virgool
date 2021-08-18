import { http } from 'utils';
import { CategoriesResponse, CategoryResponse, GetCategoriesParms, CreateCategoryDto } from './types';
import { CrudServices } from '../common.services';

export const CategoriesServices = new class implements CrudServices {
    uri = "/categories";

    async findAll<CategoriesResponse>(params?: GetCategoriesParms) {
        return http.get<CategoriesResponse>(this.uri, { params });
    }

    async findOne<CategoryResponse>(id: number) {
        return http.get<CategoryResponse>(`${this.uri}/${id}`);
    }

    async create<CreateCategoryDto>(data: CreateCategoryDto) {
        return http.post<any>(this.uri, data);
    }

    async update<UpdateCategoryDto>(id: number, data: UpdateCategoryDto) {
        return http.put<any>(`${this.uri}/${id}`, data);
    }

    async remove(id: number) {
        return http.delete(`${this.uri}/${id}`)
    }
}()