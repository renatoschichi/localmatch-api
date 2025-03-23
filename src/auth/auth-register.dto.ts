import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({ example: 'teste@gmail.com', description: 'Email do usuário para registro' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123', description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Usuário Teste', description: 'Nome do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;
}