import { AxiosResponse } from 'axios';

export interface GetAllParams {
    size?: number;
    offset?: number;
    paginate?: boolean;
    startDate?: Date;
    endDate?: Date;
}

export interface GetOneParams {
    id: number;
}

export interface CrudServices {
    findAll?: <Response, Params extends GetAllParams>(params?: Params) => Promise<AxiosResponse<Response>>;
    findOne?: <Response, Params extends GetOneParams>(id: number, params?: Params) => Promise<AxiosResponse<Response>>;
    create?: <CreateDto, Response, P>(data: CreateDto, params?: P) => Promise<AxiosResponse<Response>>;
    update?: <UpdateDto, Response, Params>(id: number, data: UpdateDto, params?: Params) => Promise<AxiosResponse<Response>>;
    remove?: <Response>(id: number) => Promise<AxiosResponse<Response>>;
}