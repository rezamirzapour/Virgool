/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { UsersModule } from 'users/users.module';
import { UserFollowedListener } from './listeners';

@Module({
  controllers: [MeController],
  providers: [MeService, UserFollowedListener],
  imports: [UsersModule]
})
export class MeModule { }
