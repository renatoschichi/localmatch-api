import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({ type: Category, description: 'Categoria criada com sucesso' })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiCreatedResponse({ type: [Category], description: 'Lista de categorias' })
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: Category, description: 'Detalhes da categoria' })
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBody({ type: UpdateCategoryDto })
  @ApiCreatedResponse({ type: Category, description: 'Categoria atualizada com sucesso' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiCreatedResponse({ description: 'Categoria removida com sucesso' })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(+id);
  }
}