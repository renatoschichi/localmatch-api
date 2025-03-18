import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('events')
export class Event {
  @ApiProperty({ example: 1, description: 'ID do evento' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Show de Rock', description: 'Título do evento' })
  @Column()
  title: string;

  @ApiPropertyOptional({ example: 'Show ao vivo', description: 'Descrição do evento' })
  @Column({ nullable: true })
  description: string;

  @ApiPropertyOptional({ example: 'Praça Central', description: 'Local do evento' })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({ example: '2025-03-10T19:00:00.000Z', description: 'Data e hora de início do evento' })
  @Column({ type: 'datetime', nullable: true })
  startDate: Date;

  @ApiProperty({ example: '2025-03-10T22:00:00.000Z', description: 'Data e hora de término do evento' })
  @Column({ type: 'datetime', nullable: true })
  endDate: Date;

  @ApiProperty({ type: () => Category, description: 'Categoria do evento' })
  @ManyToOne(() => Category, (category) => category.events, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  category: Category;
}