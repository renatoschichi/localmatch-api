import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @ApiProperty({ example: 2, description: 'ID do destinatário' })
  @IsNumber()
  receiverId: number;

  @ApiProperty({ example: 'Olá, tudo bem?', description: 'Conteúdo da mensagem' })
  @IsString()
  @IsNotEmpty()
  content: string;
}