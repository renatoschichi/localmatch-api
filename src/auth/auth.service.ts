import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/users/user.entity';
import { UserRole } from 'src/users/user-role.enum';
import { AuthRegisterDto } from './auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) {}

  async register(data: AuthRegisterDto): Promise<any> {
    const userExists = await this.usersService.findByEmail(data.email);
    if (userExists) {
      throw new UnauthorizedException('Email já está em uso');
    }

    const role = UserRole.ROLE_CONSUMER;

    const user = await this.usersService.create({
      email: data.email,
      password: data.password,
      name: data.name,
      role,
    });

    const confirmationToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '1h' });
    const confirmationLink = `${process.env.FRONTEND_URL}/auth/confirm?token=${confirmationToken}`;

    const emailHtml = `
      <h1>Bem-vindo(a) ao nosso App!</h1>
      <p>Para confirmar sua conta, clique no link abaixo:</p>
      <a href="${confirmationLink}">Confirmar Conta</a>
      <p>Se você não se cadastrou, por favor ignore este e-mail.</p>
    `;
    await this.emailService.sendEmailConfirmation(user.email, 'Confirmação de Conta', emailHtml);

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }
}