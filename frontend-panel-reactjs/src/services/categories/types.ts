
import { GetAllParams, GetOneParams, FindAllResponse, FindOneResponse } from '../common/common.services.interface';

export interface CreateCategoryDto {
    title: string
}

export interface UpdateCategoryDto extends CreateCategoryDto { }

export interface GetCategoriesParms extends GetAllParams {
    title?: string;
}
export interface GetCategoryParms extends GetOneParams { }

export interface CategoriesResult {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoriesResponse extends FindAllResponse<CategoriesResult> { }

export interface CategoryResult {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryResponse extends FindOneResponse<CategoriesResult> { }