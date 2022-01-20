import { http } from 'utils';
import { CategoriesResponse, CategoryResponse, GetCategoriesParms, CreateCategoryDto ,UpdateCategoryDto} from 'types';

export const CategoriesServices = {
    uri: "/categories",

    async findAll(params?: GetCategoriesParms) {
        return http.get<CategoriesResponse>(this.uri, { params });
    },

    async findOne(id: number) {
        return http.get<CategoryResponse>(`${this.uri}/${id}`);
    },

    async create(data: CreateCategoryDto) {
        return http.post<any>(this.uri, data);
    },

    async update(id: number, data: UpdateCategoryDto) {
        return http.put<any>(`${this.uri}/${id}`, data);
    },

    async remove(id: number) {
        return http.delete(`${this.uri}/${id}`)
    },
} as const