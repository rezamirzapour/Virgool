/* eslint-disable prettier/prettier */
import { Body, Query, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto, ListCommentsParams } from './dto';
import { ApiController, GetAllMethod, GetOneMethod, PostMethod, PutMethod, DeleteMethod, ID, User } from 'common/decorator';

@ApiController('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @PostMethod()
  create(@Body() createCommentDto: CreateCommentDto, @User() user) {
    return this.commentsService.create(createCommentDto, user);
  }

  @GetAllMethod()
  findAll(@Query(new ValidationPipe({ transform: true })) listCommentsParams: ListCommentsParams) {
    return this.commentsService.findAll(listCommentsParams);
  }

  @GetOneMethod(':id')
  findOne(@ID() id: number) {
    return this.commentsService.findOne(id);
  }

  @PutMethod(':id')
  update(@ID() id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @DeleteMethod(':id')
  remove(@ID() id: number) {
    return this.commentsService.remove(id);
  }
}
