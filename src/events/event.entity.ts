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

  @Column({ type: 'datetime', nullable: true })
  startDate: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate: Date;

  @ApiPropertyOptional({ example: 'data:image/jpeg;base64,...', description: 'Imagem 1 do evento, em base64' })
  @Column({ type: 'text', nullable: true })
  image1: string;

  @ApiPropertyOptional({ example: 'data:image/jpeg;base64,...', description: 'Imagem 2 do evento, em base64' })
  @Column({ type: 'text', nullable: true })
  image2: string;

  @ApiPropertyOptional({ example: 'data:image/jpeg;base64,...', description: 'Imagem 3 do evento, em base64' })
  @Column({ type: 'text', nullable: true })
  image3: string;

  @ApiPropertyOptional({ example: 'Evento gratuito', description: 'Informações adicionais do evento' })
  @Column({ nullable: true })
  additionalInfo: string;

  @ApiProperty({ type: () => Category, description: 'Categoria do evento' })
  @ManyToOne(() => Category, (category) => category.events, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  category: Category;

  @ApiProperty({ example: '2025-03-10T18:00:00', description: 'Data de criação do evento' })
  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @ApiProperty({ example: '2025-03-10T18:30:00', description: 'Data da última atualização do evento' })
  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}