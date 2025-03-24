import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat-message.entity';
import { CreateChatMessageDto } from './create-chat-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async createMessage(senderId: number, data: CreateChatMessageDto): Promise<ChatMessage> {
    const message = this.chatMessageRepository.create({
      senderId,
      receiverId: data.receiverId,
      content: data.content,
    });
    return this.chatMessageRepository.save(message);
  }

  async getMessagesForUser(userId: number): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({
      where: [{ senderId: userId }, { receiverId: userId }],
      order: { createdAt: 'ASC' },
    });
  }

  async getConversation(userId: number, partnerId: number): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({
      where: [
        { senderId: userId, receiverId: partnerId },
        { senderId: partnerId, receiverId: userId },
      ],
      order: { createdAt: 'ASC' },
    });
  }
}