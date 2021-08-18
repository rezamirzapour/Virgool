import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './entities';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [SequelizeModule.forFeature([Comment])]
})
export class CommentsModule { }
