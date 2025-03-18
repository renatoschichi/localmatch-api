import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { NotificationsService } from 'src/notifications/notification.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly notificationsService: NotificationsService
  ) {}

  async create(data: Partial<Category>): Promise<Category> {
    const existing = await this.categoryRepository.findOne({ where: { name: data.name } });
    if (existing) {
      throw new ConflictException(`Categoria com o nome "${data.name}" já existe.`);
    }
    const category = this.categoryRepository.create(data);
    const savedCategory = await this.categoryRepository.save(category);

    await this.notificationsService.createNotification(
      `Categoria "${savedCategory.name}" criada com sucesso.`
    );
    return savedCategory;
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
    const updatedCategory = await this.categoryRepository.save(category);

    await this.notificationsService.createNotification(
      `Categoria "${updatedCategory.name}" atualizada com sucesso.`
    );
    return updatedCategory;
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    await this.notificationsService.createNotification(
      `Categoria "${category.name}" deletada.`
    );
  }
}