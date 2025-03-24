import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './chat-message.entity';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateChatMessageDto } from './create-chat-message.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('messages')
  @ApiCreatedResponse({ type: ChatMessage, description: 'Mensagem enviada com sucesso' })
  async sendMessage(
    @Body() createChatMessageDto: CreateChatMessageDto,
    @Req() req: Request
  ): Promise<ChatMessage> {
    const user = (req as any).user;
    return this.chatService.createMessage(user.id, createChatMessageDto);
  }

  @Get('messages')
  async getMessages(
    @Query('partnerId') partnerId: string,
    @Req() req: Request
  ): Promise<ChatMessage[]> {
    const user = (req as any).user;
    if (partnerId) {
      return this.chatService.getConversation(user.id, parseInt(partnerId));
    }
    return this.chatService.getMessagesForUser(user.id);
  }
}