import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({ example: 'teste@gmail.com', description: 'Email do usuário para registro' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Usuário Teste', description: 'Nome completo do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'consumer',
    description: 'Tipo de usuário: "consumer" para B2C ou "partner" para B2B',
    enum: ['consumer', 'partner']
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['consumer', 'partner'])
  userType: string;
}