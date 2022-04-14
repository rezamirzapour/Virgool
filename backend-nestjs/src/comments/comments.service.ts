/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateResponse,
  DestroyResponse,
  FindAllResponse,
  FindOneResponse,
  PaginateResponse,
} from 'src/common/httpResponse';
import { User } from 'src/users/entities';
import { Comment } from './entities';
import { CreateCommentDto, UpdateCommentDto, ListCommentsParams } from './dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}
  async create(createCommentDto: CreateCommentDto, author: User) {
    try {
      const result = await this.commentRepository.create({
        ...createCommentDto,
        authorId: author.id,
      });
      return new CreateResponse(result);
    } catch (error) {
      throw error;
    }
  }

  async findAll(listCommentsParams: ListCommentsParams) {
    const { paginate, size, offset, ...otherOptions } = listCommentsParams;
    const paginateOptions = { size, limit: offset };
    const options = { where: {} };
    for (const key in otherOptions)
      if (otherOptions[key])
        options.where = { ...options.where, [key]: otherOptions[key] };

    if (paginate) {
      const result = await this.commentRepository.findAndCountAll({
        ...paginateOptions,
        ...options,
      });
      return new PaginateResponse(result.rows, result.count);
    }
    const result = await this.commentRepository.findAll(options);
    return new FindAllResponse(result);
  }

  async findOne(id: number) {
    try {
      const comment = await this.commentRepository.findByPk(id);
      if (!comment) throw new NotFoundException();
      return new FindOneResponse(comment);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    try {
      const comment = await this.commentRepository.findByPk(id);
      if (!comment) throw new NotFoundException();
      await this.commentRepository.destroy();
      return new DestroyResponse();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
