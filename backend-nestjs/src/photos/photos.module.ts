import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { PhotosController } from './photos.controller';

@Module({
  providers: [PhotosService],
  imports: [SequelizeModule.forFeature([Photo])],
  exports: [SequelizeModule],
  controllers: [PhotosController],
})
export class PhotosModule {}
