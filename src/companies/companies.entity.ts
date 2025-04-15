import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from 'src/events/event.entity';

@Entity('companies')
export class Company {
  @ApiProperty({ example: 1, description: 'Company identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ABC Corporation', description: 'Company name' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: 'A company that does business globally', description: 'Company description' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: 'contact@abccorp.com', description: 'Company email' })
  @Column({ nullable: true })
  email: string;

  @ApiProperty({ example: '+11234567890', description: 'Company phone number' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: '123 Main St, Springfield', description: 'Company location (address)' })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({ example: '08:00:00', description: 'Opening hours in HH:mm:ss format' })
  @Column({ type: 'time', nullable: true })
  openingHours: string;

  @ApiProperty({ example: '18:00:00', description: 'Closing hours in HH:mm:ss format' })
  @Column({ type: 'time', nullable: true })
  closingHours: string;

  @ApiProperty({ example: 20, description: 'Approximate count of current people in the location' })
  @Column({ type: 'int', nullable: true })
  currentPeopleCount: number;

  @ApiProperty({ example: 200, description: 'Approximate average daily visitors' })
  @Column({ type: 'int', nullable: true })
  averageDailyVisitors: number;

  @OneToMany(() => Event, event => event.company)
  events: Event[];
}