import { Category } from 'src/categories/category.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  
  @Entity('events')
  export class Event {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column({ nullable: true })
    description: string;
  
    @Column({ nullable: true })
    location: string;
  
    @Column({ type: 'timestamp', nullable: true })
    startDate: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    endDate: Date;
  
    @ManyToOne(() => Category, (category) => category.events, {
      onDelete: 'SET NULL',
      nullable: true,
    })
    category: Category;
  }
  