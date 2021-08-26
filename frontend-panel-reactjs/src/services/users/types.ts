import { GetAllParams, GetOneParams, FindAllResponse, FindOneResponse } from '../common/common.services.interface';

export interface GetUsersParms extends GetAllParams {
    firstName?: string;
    lastName?: string;
    email?: string;
    isEmailVerified?: string;
    isPhoneNumberVerified?: string;
}

export interface GetUserParms extends GetOneParams { }

export interface UsersResult {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string | null,
    description: string | null,
    isEmailVerified: boolean,
    isPhoneNumberVerified: boolean,
    createdAt: Date,
    updatedAt: Date
    avatar: string | null
}

export interface UsersResponse extends FindAllResponse<UsersResult> { }


export interface UserResult {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string | null,
    description: string | null,
    isEmailVerified: boolean,
    isPhoneNumberVerified: boolean,
    createdAt: Date,
    updatedAt: Date
    avatar: string | null
}

export interface UserResponse extends FindOneResponse<UserResult> { }