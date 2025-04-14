import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminCreationGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const body = request.body;

        if (body.role && body.role === 'ROLE_ADMIN') {
            const adminExists = await this.usersService.adminExists();
            if (adminExists) {
                const user = request.user;
                if (user && user.role === 'ROLE_ADMIN') {
                    return true;
                }
                throw new ForbiddenException('Apenas o usuário admin pode criar outro usuário admin.');
            }
        }

        return true;
    }
}