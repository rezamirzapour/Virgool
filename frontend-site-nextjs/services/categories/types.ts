
import { GetAllParams, GetOneParams } from '../common.services/common.services.interface';

export interface CreateCategoryDto {
    title: string
}

export interface UpdateCategoryDto extends CreateCategoryDto { }

export interface GetCategoriesParms extends GetAllParams {
    title?: string;
}
export interface GetCategoryParms extends GetOneParams { }

export interface CategoriesPayloadResponse {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoriesResponse {
    result: CategoriesPayloadResponse[];
    count: number;
    message: string;
}

export interface CategoryPayloadResponse {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryResponse {
    result: CategoryPayloadResponse;
    count: number;
    message: string;
}