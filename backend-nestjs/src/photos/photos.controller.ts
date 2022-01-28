/* eslint-disable prettier/prettier */
import {
  Param,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiController,
  PostMethod,
  GetAllMethod,
  GetOneMethod,
  ID,
} from 'common/decorator';
import { PhotosService } from './photos.service';
import {
  FindOneResponse,
  CreateResponse,
  DestroyResponse,
  UpdateResponse,
  FindAllResponse,
} from 'common/httpResponse';
import { ListAllArticlesParams, PhotoDetailsParams } from './dto';
@ApiController('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}
  @PostMethod()
  @UseInterceptors(FileInterceptor('image'))
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @GetAllMethod()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    listAllArticlesParams: ListAllArticlesParams,
  ) {
    return this.photosService.findAll(listAllArticlesParams);
  }

  @GetOneMethod(':id')
  async findOne(@Param() params: PhotoDetailsParams, @ID() id, @Res() res) {
    const result = await this.photosService.findOne(id);
    return res.sendFile(result.path, { root: '.' });
  }
}
