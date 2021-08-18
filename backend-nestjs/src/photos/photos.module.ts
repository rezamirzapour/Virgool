import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './entities/photo.entity';

@Module({
  providers: [PhotosService],
  imports: [SequelizeModule.forFeature([Photo])],
  exports: [SequelizeModule]
})
export class PhotosModule { }
