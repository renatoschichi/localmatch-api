import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { UserRole } from 'src/users/user-role.enum';
import { NotificationsService } from 'src/notifications/notification.service';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly notificationsService: NotificationsService
  ) {}

  async create(data: CreateEventDto, actorRole: UserRole): Promise<Event> {
    const eventData: Partial<Event> = { ...data };
    if (data.categoryId) {
      eventData.category = { id: data.categoryId } as any;
    }
    const event = this.eventRepository.create(eventData);
    const savedEvent = await this.eventRepository.save(event);
    await this.notificationsService.createNotification(
      `Evento "${savedEvent.title}" criado com sucesso.`,
      actorRole
    );
    return savedEvent;
  }

  async update(id: number, data: UpdateEventDto, actorRole: UserRole): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, data);
    if (data.categoryId) {
      event.category = { id: data.categoryId } as any;
    }
    const updatedEvent = await this.eventRepository.save(event);
    await this.notificationsService.createNotification(
      `Evento "${updatedEvent.title}" atualizado com sucesso.`,
      actorRole
    );
    return updatedEvent;
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!event) {
      throw new NotFoundException(`Evento #${id} não encontrado`);
    }
    return event;
  }

  async remove(id: number, actorRole: UserRole): Promise<void> {
    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
    await this.notificationsService.createNotification(
      `Evento "${event.title}" deletado.`,
      actorRole
    );
  }
}