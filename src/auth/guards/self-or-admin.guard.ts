import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = parseInt(request.params.id, 10);

    if (user && (user.role === 'ROLE_ADMIN' || user.id === paramId)) {
      return true;
    }
    throw new ForbiddenException('Você não tem permissão para alterar ou deletar este usuário.');
  }
}