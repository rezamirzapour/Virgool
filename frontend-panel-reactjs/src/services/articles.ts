import { http } from "utils";
import {
  GetArticlesParms,
  ArticlesResponse,
  CreateArticleDto,
  ArticleResponse,
  UpdateArticleDto,
} from "types";

class ArticleServices {
  uri = "/articles";

  findAll = async (params?: GetArticlesParms) => {
    return http.get<ArticlesResponse>(this.uri, { params });
  };

  findOne = async (id: number) => {
    return http.get<ArticleResponse>(`${this.uri}/${id}`);
  };

  create = async (data: CreateArticleDto) => {
    return http.post(this.uri, data);
  };

  update = async (id: number, data: UpdateArticleDto) => {
    return http.put(`${this.uri}/${id}`, data);
  };

  remove = async (id: number) => {
    return http.delete(`${this.uri}/${id}`);
  };
}

export default new ArticleServices();
