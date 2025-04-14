import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('notifications')
export class Notification {
  @ApiProperty({ example: 1, description: 'ID da notificação' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Novo evento criado', description: 'Mensagem da notificação' })
  @Column()
  message: string;

  @ApiProperty({ example: false, description: 'Indica se a notificação foi lida' })
  @Column({ default: false })
  read: boolean;

  @ApiProperty({ example: '2025-03-17T21:00:00.000Z', description: 'Data de criação da notificação' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}