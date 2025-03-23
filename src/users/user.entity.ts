import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user-role.enum';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'teste@gmail.com', description: 'Email do usuário' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '********', description: 'Senha do usuário' })
  @Column()
  password: string;

  @ApiProperty({ example: 'Usuário Teste', description: 'Nome do usuário' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ example: UserRole.ROLE_CONSUMER, description: 'Role do usuário' })
  @Column({ type: 'varchar', default: UserRole.ROLE_CONSUMER })
  role: UserRole;
}