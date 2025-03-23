import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { UserRole } from 'src/users/user-role.enum';

@Injectable()
export class AdminOrPartnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && (user.role === UserRole.ROLE_ADMIN || user.role === UserRole.ROLE_PARTNER)) {
      return true;
    }
    throw new ForbiddenException('Apenas usuários admin ou partner podem acessar este endpoint.');
  }
}