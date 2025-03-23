import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { NotificationsService } from 'src/notifications/notification.service';
import { UserRole } from 'src/users/user-role.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly notificationsService: NotificationsService
  ) { }

  async create(data: Partial<Category>, actorRole?: string): Promise<Category> {
    const existing = await this.categoryRepository.findOne({ where: { name: data.name } });
    if (existing) {
      throw new ConflictException(`Categoria com o nome "${data.name}" já existe.`);
    }
    const category = this.categoryRepository.create(data);
    const savedCategory = await this.categoryRepository.save(category);

    await this.notificationsService.createNotification(
      `Categoria "${savedCategory.name}" criada com sucesso.`,
      actorRole as UserRole
    );
    return savedCategory;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['events'] });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['events']
    });
    if (!category) {
      throw new NotFoundException(`Categoria #${id} não encontrada`);
    }
    return category;
  }

  async update(id: number, data: Partial<Category>, actorRole?: string): Promise<Category> {
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
      `Categoria "${updatedCategory.name}" atualizada com sucesso.`,
      actorRole as UserRole
    );
    return updatedCategory;
  }

  async remove(id: number, actorRole?: string): Promise<void> {
    const category = await this.findOne(id);
    if (category.events && category.events.length > 0) {
      throw new ConflictException(
        `Não é possível deletar a categoria "${category.name}" pois ela possui eventos cadastrados.`
      );
    }
    await this.categoryRepository.remove(category);

    await this.notificationsService.createNotification(
      `Categoria "${category.name}" deletada com sucesso.`,
      actorRole as UserRole
    );
  }
}