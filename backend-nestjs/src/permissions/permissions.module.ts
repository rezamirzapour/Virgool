import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from './entities';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [SequelizeModule.forFeature([Permission])],
})
export class PermissionsModule {}
