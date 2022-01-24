import { http } from "utils";
import {
  GetArticlesParms,
  ArticlesResponse,
  CreateArticleDto,
  ArticleResponse,
  UpdateArticleDto,
} from "types";

export class ArticleServices {
  static uri = "/articles";

  static findAll = async (params?: GetArticlesParms) => {
    return http.get<ArticlesResponse>(this.uri, { params });
  };

  static findOne = async (id: number) => {
    return http.get<ArticleResponse>(`${this.uri}/${id}`);
  };

  static create = async (data: CreateArticleDto) => {
    return http.post(this.uri, data);
  };

  static update = async (id: number, data: UpdateArticleDto) => {
    return http.put(`${this.uri}/${id}`, data);
  };

  static remove = async (id: number) => {
    return http.delete(`${this.uri}/${id}`);
  };
}
