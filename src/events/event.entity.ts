import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @ApiPropertyOptional({ example: 'Show ao vivo na cidade', description: 'Descrição do evento' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 'USA', description: 'País do evento' })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ example: 'CA', description: 'Estado do evento' })
  @Column({ nullable: true })
  state: string;

  @ApiProperty({ example: 'San Francisco', description: 'Cidade do evento' })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({ example: 'Downtown', description: 'Bairro do evento' })
  @Column({ nullable: true })
  neighborhood: string;

  @ApiProperty({ example: 'Market Street', description: 'Rua do evento' })
  @Column({ nullable: true })
  street: string;

  @ApiProperty({ example: '100', description: 'Número do evento' })
  @Column({ nullable: true })
  number: string;

  @ApiProperty({ example: '2025-03-10T19:00:00.000Z', description: 'Data e hora de início do evento' })
  @Column({ type: 'datetime', nullable: true })
  startDate: Date;

  @ApiProperty({ example: '2025-03-10T22:00:00.000Z', description: 'Data e hora de término do evento' })
  @Column({ type: 'datetime', nullable: true })
  endDate: Date;

  @ApiPropertyOptional({ example: 37.7749, description: 'Latitude do evento' })
  @Column({ type: 'float', nullable: true })
  latitude: number;

  @ApiPropertyOptional({ example: -122.4194, description: 'Longitude do evento' })
  @Column({ type: 'float', nullable: true })
  longitude: number;

  @ApiPropertyOptional({ example: 'https://example.com/event.jpg', description: 'URL da imagem do evento' })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiPropertyOptional({ example: 'Evento gratuito', description: 'Informações adicionais do evento' })
  @Column({ nullable: true })
  additionalInfo: string;

  @ApiProperty({ type: () => Category, description: 'Categoria do evento' })
  @ManyToOne(() => Category, (category) => category.events, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  category: Category;

  @ApiProperty({ example: '2025-03-10T18:00:00.000Z', description: 'Data de criação do evento' })
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @ApiProperty({ example: '2025-03-10T18:30:00.000Z', description: 'Data da última atualização do evento' })
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}