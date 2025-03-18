import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Concertos', description: 'Nome da categoria' })
  name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}