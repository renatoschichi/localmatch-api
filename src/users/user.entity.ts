import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'teste@gmail.com', description: 'Email do usuário' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário' })
  @Column()
  password: string;

  @ApiProperty({ example: 'user', description: 'Papel do usuário' })
  @Column({ default: 'user' })
  role: string;

  @ApiProperty({ example: 'Usuario Teste', description: 'Nome do usuário' })
  @Column({ nullable: true })
  name: string;
}