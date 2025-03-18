import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ order: { createdAt: 'DESC' } });
  }

  async createNotification(message: string): Promise<Notification> {
    const notification = this.notificationRepository.create({ message, read: false });
    return this.notificationRepository.save(notification);
  }
}