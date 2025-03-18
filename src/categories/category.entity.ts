import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from 'src/events/event.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({ example: 1, description: 'ID da categoria' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Concertos', description: 'Nome da categoria' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ type: () => [Event], description: 'Eventos relacionados à categoria' })
  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}