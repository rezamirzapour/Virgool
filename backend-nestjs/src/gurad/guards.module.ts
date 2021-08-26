/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common'
import { UsersModule } from 'users/users.module';
import { RolesGuard } from './roles.guard';

@Global()
@Module({
    imports: [UsersModule],
    providers: [RolesGuard],
    exports: [RolesGuard, UsersModule]
})
export class GuardsModule { }