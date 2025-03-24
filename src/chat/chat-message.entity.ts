import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('chat_messages')
export class ChatMessage {
  @ApiProperty({ example: 1, description: 'ID da mensagem' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID do remetente' })
  @Column()
  senderId: number;

  @ApiProperty({ example: 2, description: 'ID do destinatário' })
  @Column()
  receiverId: number;

  @ApiProperty({ example: 'Olá, tudo bem?', description: 'Conteúdo da mensagem' })
  @Column('text')
  content: string;

  @ApiProperty({ example: '2025-03-25T12:00:00.000Z', description: 'Data de criação da mensagem' })
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}