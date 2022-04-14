/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { UserFollowedListener } from './listeners';

@Module({
  controllers: [MeController],
  providers: [MeService, UserFollowedListener],
  imports: [UsersModule],
})
export class MeModule {}
