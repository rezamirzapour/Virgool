/* eslint-disable prettier/prettier */
import { applyDecorators, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

interface Options {
  apiOkDescription: string;
  apiForbiddenDescription: string;
  apiUnauthorizedDescription: string;
  apiInternalServerErrorDescription: string;
  apiNotFoundDescription: string;
  apiBadRequestDescription: string;
}

const defaultOptions: Options = {
  apiOkDescription: 'Updated Successfully',
  apiForbiddenDescription: 'Permission Denied',
  apiUnauthorizedDescription: 'Unauthorized',
  apiInternalServerErrorDescription: 'Internal Server Error',
  apiNotFoundDescription: 'Not Found',
  apiBadRequestDescription: 'Bad Request',
};

export function PutMethod(path: string | string[], options?: Partial<Options>) {
  const combinedOptions: Options = {
    ...options,
    ...defaultOptions,
  };
  return applyDecorators(
    Put(path),
    ApiBearerAuth(),
    UseGuards(AuthGuard('jwt')),
    ApiOkResponse({ description: combinedOptions.apiOkDescription }),
    ApiForbiddenResponse({
      description: combinedOptions.apiForbiddenDescription,
    }),
    ApiUnauthorizedResponse({
      description: combinedOptions.apiUnauthorizedDescription,
    }),
    ApiInternalServerErrorResponse({
      description: combinedOptions.apiInternalServerErrorDescription,
    }),
    ApiNotFoundResponse({
      description: combinedOptions.apiNotFoundDescription,
    }),
    ApiBadRequestResponse({
      description: combinedOptions.apiBadRequestDescription,
    }),
  );
}
