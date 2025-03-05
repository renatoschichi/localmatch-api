import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user
    };
  }

  async register(data: Partial<User>) {
    const userExists = await this.usersService.findByEmail(data.email);
    if (userExists) {
      throw new UnauthorizedException('Email já está em uso');
    }

    const user = await this.usersService.create(data);
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}