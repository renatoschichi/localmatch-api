import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) { }

  async create(data: CreateEventDto): Promise<Event> {
    const existingEvent = await this.eventRepository.findOne({
      where: { title: data.title, startDate: data.startDate },
    });
    if (existingEvent) {
      throw new ConflictException(`Evento com o título "${data.title}" e data de início "${data.startDate}" já existe.`);
    }
    const eventData: Partial<Event> = { ...data };
    if (data.categoryId) {
      eventData.category = { id: data.categoryId } as any;
    }
    const event = this.eventRepository.create(eventData);
    return this.eventRepository.save(event);
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
    if (data.title || data.startDate) {
      const eventToUpdate = await this.eventRepository.findOne({
        where: { title: data.title || undefined, startDate: data.startDate || undefined },
      });
      if (eventToUpdate && eventToUpdate.id !== id) {
        throw new ConflictException(
          `Já existe um evento com o título "${data.title}" e data de início "${data.startDate}".`
        );
      }
    }
    const event = await this.findOne(id);
    Object.assign(event, data);
    if (data.categoryId) {
      event.category = { id: data.categoryId } as any;
    }
    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
  }
}