import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { AdminOrPartnerGuard } from 'src/auth/guards/admin-or-partner.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { UserRole } from 'src/users/user-role.enum';

@ApiTags('events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminOrPartnerGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  @ApiBody({ type: CreateEventDto })
  @ApiCreatedResponse({ type: Event, description: 'Evento criado com sucesso' })
  create(@Body() createEventDto: CreateEventDto, @Req() req: Request): Promise<Event> {
    const actorRole = (req as any).user.role as UserRole;
    return this.eventsService.create(createEventDto, actorRole);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateEventDto })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @Req() req: Request): Promise<Event> {
    const actorRole = (req as any).user.role as UserRole;
    return this.eventsService.update(+id, updateEventDto, actorRole);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request): Promise<void> {
    const actorRole = (req as any).user.role as UserRole;
    return this.eventsService.remove(+id, actorRole);
  }
}