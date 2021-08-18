import { GetAllParams, GetOneParams } from '../common.services/common.services.interface';

export interface GetUsersParms extends GetAllParams {
    firstName?: string;
    lastName?: string;
    email?: string;
    isEmailVerified?: string;
    isPhoneNumberVerified?: string;
}

export interface GetUserParms extends GetOneParams { }

export interface UsersPayloadResponse {
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

export interface UsersResponse {
    result: UsersPayloadResponse[];
    count: number;
    message: string;
}


export interface UserPayloadResponse {
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

export interface UserResponse {
    result: UserPayloadResponse;
    message: string;
}