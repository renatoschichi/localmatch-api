import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
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

  async create(data: CreateEventDto): Promise<Event> {
    const existingEvent = await this.eventRepository.findOne({
      where: { title: data.title, startDate: data.startDate },
    });
    if (existingEvent) {
      throw new ConflictException(
        `Evento com o título "${data.title}" e data de início "${data.startDate}" já existe.`
      );
    }

    const eventData: Partial<Event> = { ...data };
    if (data.categoryId) {
      eventData.category = { id: data.categoryId } as any;
    }
    const event = this.eventRepository.create(eventData);
    const savedEvent = await this.eventRepository.save(event);

    await this.notificationsService.createNotification(
      `Evento "${savedEvent.title}" criado com sucesso.`
    );
    return savedEvent;
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

  async update(id: number, data: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, data);
    if (data.categoryId) {
      event.category = { id: data.categoryId } as any;
    }
    const updatedEvent = await this.eventRepository.save(event);

    await this.notificationsService.createNotification(
      `Evento "${updatedEvent.title}" atualizado com sucesso.`
    );
    return updatedEvent;
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
    await this.notificationsService.createNotification(
      `Evento "${event.title}" deletado.`
    );
  }
}