import { http } from "src/utils";
import type {
  CategoriesResponse,
  CategoryResponse,
  GetCategoriesParms,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "types";

export class CategoriesServices {
  static uri = "/categories";

  static findAll = async (params?: GetCategoriesParms) => {
    return http.get<CategoriesResponse>(this.uri, { params });
  };

  static findOne = async (id: number) => {
    return http.get<CategoryResponse>(`${this.uri}/${id}`);
  };

  static create = async (data: CreateCategoryDto) => {
    return http.post<any>(this.uri, data);
  };

  static update = async (id: number, data: UpdateCategoryDto) => {
    return http.put<any>(`${this.uri}/${id}`, data);
  };

  static remove = async (id: number) => {
    return http.delete(`${this.uri}/${id}`);
  };
}
