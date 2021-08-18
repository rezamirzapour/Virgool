export interface LoginDto {
    email: string;
    password: string
}

export interface RegisterDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string
}

export interface LoginResponsePayload {
    access_token: string
}

export interface RegisterResponsePayload {
    access_token: string
}
