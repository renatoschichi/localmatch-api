import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.role === 'ROLE_ADMIN') {
      return true;
    }
    throw new ForbiddenException('Apenas usuários admin podem acessar este endpoint.');
  }
}