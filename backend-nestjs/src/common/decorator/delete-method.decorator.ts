/* eslint-disable prettier/prettier */
import { applyDecorators, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport';

interface Options {
    apiOkDescription: string,
    apiForbiddenDescription: string,
    apiUnauthorizedDescription: string,
    apiInternalServerErrorDescription: string,
    apiNotFoundDescription: string
}

const defaultOptions: Options = {
    apiOkDescription: 'Deleted Successfully',
    apiForbiddenDescription: 'Permission Denied',
    apiUnauthorizedDescription: 'Unauthorized',
    apiInternalServerErrorDescription: 'Internal Server Error',
    apiNotFoundDescription: 'Not Found'
}

export function DeleteMethod(path: string | string[], options?: Partial<Options>) {
    const combinedOptions = {
        ...defaultOptions,
        ...options
    }
    return applyDecorators(
        Delete(path),
        ApiBearerAuth(),
        UseGuards(AuthGuard("jwt")),
        ApiOkResponse({ description: combinedOptions.apiOkDescription }),
        ApiForbiddenResponse({ description: combinedOptions.apiForbiddenDescription }),
        ApiUnauthorizedResponse({ description: combinedOptions.apiUnauthorizedDescription }),
        ApiInternalServerErrorResponse({ description: combinedOptions.apiInternalServerErrorDescription }),
        ApiNotFoundResponse({ description: combinedOptions.apiNotFoundDescription })
    );
}
