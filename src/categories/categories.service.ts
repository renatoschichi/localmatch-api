import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(data: Partial<Category>): Promise<Category> {
    const existing = await this.categoryRepository.findOne({ where: { name: data.name } });
    if (existing) {
      throw new ConflictException(`Categoria com o nome "${data.name}" já existe.`);
    }

    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['events'],
    });
    if (!category) {
      throw new NotFoundException(`Categoria #${id} não encontrada`);
    }
    return category;
  }

  async update(id: number, data: Partial<Category>): Promise<Category> {
    if (data.name) {
      const existing = await this.categoryRepository.findOne({ where: { name: data.name } });
      if (existing && existing.id !== id) {
        throw new ConflictException(`Outra categoria com o nome "${data.name}" já existe.`);
      }
    }
    const category = await this.findOne(id);
    Object.assign(category, data);
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}