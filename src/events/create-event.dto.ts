import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Show de Rock', description: 'Título do evento' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Show ao vivo na cidade', description: 'Descrição do evento' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'Praça Central', description: 'Local do evento' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: '2025-03-10T19:00:00.000Z', description: 'Data e hora de início do evento' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2025-03-10T22:00:00.000Z', description: 'Data e hora de término do evento' })
  @IsDateString()
  endDate: Date;

  @ApiPropertyOptional({ example: 1, description: 'ID da categoria do evento' })
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}