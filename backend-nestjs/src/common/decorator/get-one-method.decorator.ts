/* eslint-disable prettier/prettier */
import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

interface Options {
  apiOkDescription: string;
  apiNotFoundDescription: string;
  example: any;
}

const defaultOptions: Options = {
  apiOkDescription: 'Retrieved Successfully',
  apiNotFoundDescription: 'Nout Found',
  example: {},
};

export function GetOneMethod(
  path: string | string[] = '',
  options?: Partial<Options>,
) {
  const combinedOptions: Options = {
    ...defaultOptions,
    ...options,
  };
  return applyDecorators(
    Get(path),
    ApiOkResponse({ description: combinedOptions.apiOkDescription }),
    ApiNotFoundResponse({
      description: combinedOptions.apiNotFoundDescription,
    }),
  );
}
