import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './auth-register.dto';
import { AuthLoginDto } from './auth-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'Usuário registrado com sucesso' })
  register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'Usuário autenticado com sucesso' })
  async login(@Body() authLoginDto: AuthLoginDto) {
    const user = await this.authService.validateUser(authLoginDto.email, authLoginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }
}