import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { UserRole } from './user-role.enum';

export class AdminCreateUserDto {
    @ApiProperty({ example: 'partner@exemplo.com', description: 'Email do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123', description: 'Senha do usuário' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'Empresa Parceira', description: 'Nome do usuário' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: UserRole.ROLE_PARTNER, description: 'Role do usuário: ROLE_ADMIN, ROLE_PARTNER ou ROLE_CONSUMER' })
    @IsEnum(UserRole)
    role: UserRole;
}