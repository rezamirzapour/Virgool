import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule { }
