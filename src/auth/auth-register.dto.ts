import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/users/user-role.enum';

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

  @ApiProperty({ example: 'ROLE_PARTNER', description: 'Role do usuário (opcional)' })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role inválido' })
  role?: UserRole;
}