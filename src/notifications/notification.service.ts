import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { UserRole } from 'src/users/user-role.enum';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ order: { createdAt: 'DESC' } });
  }

  async createNotification(message: string, actorRole?: UserRole): Promise<Notification> {
    let prefix = "";
    if (actorRole === UserRole.ROLE_ADMIN) {
      prefix = "Admin: ";
    } else if (actorRole === UserRole.ROLE_PARTNER) {
      prefix = "Parceiro: ";
    }
    const notification = this.notificationRepository.create({
      message: `${prefix}${message}`,
      read: false,
    });
    return this.notificationRepository.save(notification);
  }
}