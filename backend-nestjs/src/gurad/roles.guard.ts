/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  private async hasPrermission(userId: number, ...permissions: string[]) {
    if (!permissions) return true;
    const user = await this.usersService.findOne(userId);
    if (user.role.allowAny) return true;

    return Boolean(
      user?.role?.permissions?.find?.((p) => permissions.includes(p.title)),
    );
  }

  async canActivate(context: ExecutionContext) {
    const permissions = this.reflector.get('permissions', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    return this.hasPrermission(user.id, permissions);
  }
}
