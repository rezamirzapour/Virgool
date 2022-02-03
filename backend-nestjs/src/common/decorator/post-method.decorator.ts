/* eslint-disable prettier/prettier */
import { applyDecorators, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

interface Options {
  apiCreatedDescription: string;
  apiForbiddenDescription: string;
  apiUnauthorizedDescription: string;
  apiInternalServerErrorDescription: string;
}

const defaultOptions: Options = {
  apiCreatedDescription: 'Created Successfully',
  apiForbiddenDescription: 'Permission Denied',
  apiUnauthorizedDescription: 'Unauthorized',
  apiInternalServerErrorDescription: 'Internal Server Error',
};

export function PostMethod(
  path: string | string[] = '',
  options?: Partial<Options>,
) {
  const combinedOptions = {
    ...defaultOptions,
    ...options,
  };
  return applyDecorators(
    Post(path),
    ApiBearerAuth(),
    UseGuards(AuthGuard('jwt')),
    ApiCreatedResponse({ description: combinedOptions.apiCreatedDescription }),
    ApiForbiddenResponse({
      description: combinedOptions.apiForbiddenDescription,
    }),
    ApiUnauthorizedResponse({
      description: combinedOptions.apiUnauthorizedDescription,
    }),
    ApiInternalServerErrorResponse({
      description: combinedOptions.apiInternalServerErrorDescription,
    }),
  );
}
