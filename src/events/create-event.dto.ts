import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Show de Rock', description: 'Título do evento' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Show ao vivo na cidade', description: 'Descrição do evento' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'USA', description: 'País do evento' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'CA', description: 'Estado do evento' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 'San Francisco', description: 'Cidade do evento' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Downtown', description: 'Bairro do evento' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ example: 'Market Street', description: 'Rua do evento' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: '100', description: 'Número do evento' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: '2025-03-10T19:00:00.000Z', description: 'Data e hora de início do evento' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2025-03-10T22:00:00.000Z', description: 'Data e hora de término do evento' })
  @IsDateString()
  endDate: Date;

  @ApiPropertyOptional({ example: 37.7749, description: 'Latitude do evento' })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: -122.4194, description: 'Longitude do evento' })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID da categoria do evento' })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({ example: 'data:image/jpeg;base64,...', description: 'Imagem 1 do evento, em base64' })
  @IsOptional()
  @IsString()
  image1?: string;

  @ApiPropertyOptional({ example: 'data:image/jpeg;base64,...', description: 'Imagem 2 do evento, em base64' })
  @IsOptional()
  @IsString()
  image2?: string;

  @ApiPropertyOptional({ example: 'data:image/jpeg;base64,...', description: 'Imagem 3 do evento, em base64' })
  @IsOptional()
  @IsString()
  image3?: string;

  @ApiPropertyOptional({ example: 'Evento gratuito', description: 'Informações adicionais do evento' })
  @IsOptional()
  @IsString()
  additionalInfo?: string;
}