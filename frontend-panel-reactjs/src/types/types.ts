import type { ReactNode } from "react";

export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

export interface ISidebarLink {
  title: string;
  icon: ReactNode;
  path: string;
}

export interface IPageInfo {
  title: string;
  description?: string;
}

// services
export interface GetAllParams {
  size?: number;
  offset?: number;
  paginate?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface FindAllResponse<T> {
  result: T[];
  count: number;
  message: string;
}
export interface FindOneResponse<T> {
  result: T;
  message: string;
}

export interface GetOneParams {
  id: number;
}

export interface GetArticlesParms extends GetAllParams {
  title?: string;
  status?: "published" | "unpublished";
  startLikeCount?: number;
  endLikeCount?: number;
  categories?: number[];
}
export interface GetArticleParms extends GetOneParams {}

export interface CreateArticleDto {
  title: string;
  content: string;
  thumbnailId: number | null;
  categories: number[];
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> {}

export interface ArticlesResult {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  status: string | null;
  authorId: number | null;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
  categories: {
    id: number;
    title: string;
  }[];
  thumbnail: PhotosResult;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticlesResponse extends FindAllResponse<ArticlesResult> {}

export interface ArticleResult {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  status: string | null;
  authorId: number | null;
  thumbnail: PhotosResult | null;
  categories: {
    id: number;
    title: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleResponse extends FindOneResponse<ArticleResult> {}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginResponsePayload {
  access_token: string;
}

export interface RegisterResponsePayload {
  access_token: string;
}

export interface CreateCategoryDto {
  title: string;
}

export interface UpdateCategoryDto extends CreateCategoryDto {}

export interface GetCategoriesParms extends GetAllParams {
  title?: string;
}

export interface GetCategoryParms extends GetOneParams {}

export interface CategoriesResult {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoriesResponse extends FindAllResponse<CategoriesResult> {}

export interface CategoryResult {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryResponse extends FindOneResponse<CategoriesResult> {}

export interface GetProfileResponse {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  description: string;
}

export interface GetPermissionsParams extends GetAllParams {
  title?: string;
}

export interface GetPermissionParams extends GetOneParams {}

export interface CreatePermissionDto {
  title: string;
}

export interface UpdatePermissionDto extends CreatePermissionDto {}

export interface PermissionsResult {
  id: number;
  title: string;
}

export interface PermissionResult {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PermissionsResponse
  extends FindAllResponse<PermissionsResult> {}

export interface PermissionResponse extends FindOneResponse<PermissionResult> {}

export interface GetRolesParms extends GetAllParams {
  title?: string;
}

export interface GetRoleParms extends GetOneParams {}

export interface RolesResult {
  id: number;
  title: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleResult {
  id: number;
  title: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: {
    id: number;
    title: string;
  }[];
}

export interface RolesResponse extends FindAllResponse<RolesResult> {}

export interface RoleResponse extends FindOneResponse<RoleResult> {}

export interface CreateRoleDto {
  title: string;
  label: string;
  permissions: number[];
}

export interface UpdateRoleDto extends CreateRoleDto {}

export interface GetUsersParms extends GetAllParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  isEmailVerified?: string;
  isPhoneNumberVerified?: string;
}

export interface GetUserParms extends GetOneParams {}

export interface UsersResult {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  description: string | null;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatar: string | null;
}

export interface UsersResponse extends FindAllResponse<UsersResult> {}

export interface UserResult {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  description: string | null;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatar: string | null;
}

export interface UserResponse extends FindOneResponse<UserResult> {}

export interface PhotosResult {
  id: number;
  fullPath: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhotosResponse extends FindAllResponse<PhotosResult> {}

export interface GetPhotosParms extends GetAllParams {}

export interface UpdateProfileDto {
  email: string;
  firstName: string;
  lastName: string;
  description: string;
}
