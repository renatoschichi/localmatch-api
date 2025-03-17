import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsIn } from 'class-validator';

export class AdminCreateUserDto {
    @ApiProperty({ example: 'teste@gmail.com', description: 'Email do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456', description: 'Senha do usuário' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'Usuário Teste', description: 'Nome do usuário' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'user',
        description: 'Tipo de usuário (role). Exemplo: "user" para B2C, "partner" para B2B, "admin" para administrador',
        enum: ['user', 'partner', 'admin']
    })
    @IsString()
    @IsNotEmpty()
    @IsIn(['user', 'partner', 'admin'])
    role: string;
}