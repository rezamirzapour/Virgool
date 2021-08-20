/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, Following, Notification } from 'database/database.entities';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User, Following, Notification])],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule { }
