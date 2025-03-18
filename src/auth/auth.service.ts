import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { AuthRegisterDto } from './auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(data: AuthRegisterDto): Promise<any> {
    const userExists = await this.usersService.findByEmail(data.email);
    if (userExists) {
      throw new UnauthorizedException('Email já está em uso');
    }

    const role = data.userType === 'partner' ? 'partner' : 'user';

    const user = await this.usersService.create({
      email: data.email,
      password: data.password,
      name: data.name,
      role,
    });

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