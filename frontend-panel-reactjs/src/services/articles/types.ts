import { GetAllParams, GetOneParams } from '../common/common.services.interface';

export interface GetArticlesParms extends GetAllParams {
    title?: string;
    status?: "published" | 'unpublished'
    startLikeCount?: number;
    endLikeCount?: number;
    categories?: number[]
}
export interface GetArticleParms extends GetOneParams { }

export interface CreateArticleDto {
    title: string;
    content: string;
    thumbnailId: number | null;
    categories: number[];
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> { }


export interface ArticlesPayloadResponse {
    id: number;
    title: string;
    content: string;
    likeCount: number;
    status: string | null;
    authorId: number | null;
    thumbnailId: number | null;
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
    thumbnail: string | null;
    createdAt: Date;
    updatedAt: Date
}

export interface ArticlesResponse {
    result: ArticlesPayloadResponse[];
    count: number;
    message: string;
}


export interface ArticlePayloadResponse {
    id: number;
    title: string;
    content: string;
    likeCount: number;
    status: string | null;
    authorId: number | null;
    thumbnailId: number | null;
    categories: {
        id: number;
        title: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ArticleResponse {
    result: ArticlePayloadResponse;
    message: string;
}