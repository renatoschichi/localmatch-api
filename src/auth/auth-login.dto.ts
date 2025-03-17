import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ example: 'teste@gmail.com', description: 'Email do usuário para login' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123', description: 'Senha do usuário para login' })
  @IsString()
  @IsNotEmpty()
  password: string;
}