import { http } from "utils";
import {
  CategoriesResponse,
  CategoryResponse,
  GetCategoriesParms,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "types";

class CategoriesServices {
  uri = "/categories";

  findAll = async (params?: GetCategoriesParms) => {
    return http.get<CategoriesResponse>(this.uri, { params });
  };

  findOne = async (id: number) => {
    return http.get<CategoryResponse>(`${this.uri}/${id}`);
  };

  create = async (data: CreateCategoryDto) => {
    return http.post<any>(this.uri, data);
  };

  update = async (id: number, data: UpdateCategoryDto) => {
    return http.put<any>(`${this.uri}/${id}`, data);
  };

  remove = async (id: number) => {
    return http.delete(`${this.uri}/${id}`);
  };
}
export default new CategoriesServices();
