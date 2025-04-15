import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsInt } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'ABC Corporation', description: 'Company name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'A company that does business globally', description: 'Company description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'contact@abccorp.com', description: 'Company email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+11234567890', description: 'Company phone number' })
  @IsOptional()
  @IsString()
  phone?: string;
  
  @ApiProperty({ example: '123 Main St, Springfield', description: 'Company location (address)' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '08:00:00', description: 'Opening hours in HH:mm:ss format' })
  @IsOptional()
  @IsString()
  openingHours?: string;

  @ApiProperty({ example: '18:00:00', description: 'Closing hours in HH:mm:ss format' })
  @IsOptional()
  @IsString()
  closingHours?: string;

  @ApiProperty({ example: 20, description: 'Approximate count of current people in the location' })
  @IsOptional()
  @IsInt()
  currentPeopleCount?: number;

  @ApiProperty({ example: 200, description: 'Approximate average daily visitors' })
  @IsOptional()
  @IsInt()
  averageDailyVisitors?: number;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}