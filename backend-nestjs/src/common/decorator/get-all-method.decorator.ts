/* eslint-disable prettier/prettier */
import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

interface Options {
  apiOkDescription: string;
}

const defaultOptions: Options = {
  apiOkDescription: 'Retrieved Successfully',
};

export function GetAllMethod(
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
  );
}
