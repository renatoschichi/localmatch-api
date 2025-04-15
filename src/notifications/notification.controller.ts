import { Controller, Get } from '@nestjs/common';
import { Notification } from './notification.entity';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { NotificationsService } from './notification.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOkResponse({ type: [Notification] })
  async findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }
}