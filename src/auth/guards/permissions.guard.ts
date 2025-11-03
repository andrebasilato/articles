import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PermissionName } from '../dto/permission-name.enum';
import { CurrentUserDto } from '../dto/current-user.dto';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<PermissionName[]>(
      PERMISSIONS_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!required || required.length === 0) {
      return true;
    }
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as CurrentUserDto;
    return !!user && required.includes(user.permissionName as PermissionName);
  }
}