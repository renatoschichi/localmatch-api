import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from './user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async adminExists(): Promise<boolean> {
    const admin = await this.userRepository.findOne({ where: { role: UserRole.ROLE_ADMIN } });
    return Boolean(admin);
  }  

  async create(data: Partial<User>): Promise<User> {
    if (data.role === UserRole.ROLE_ADMIN) {
      const adminExists = await this.userRepository.findOne({ where: { role: UserRole.ROLE_ADMIN } });
      if (adminExists) {
        throw new ConflictException('Já existe um usuário admin. Apenas um usuário admin é permitido.');
      }
    }
    const newUser = this.userRepository.create(data);
    return this.userRepository.save(newUser);
  }

  async findAll(role?: string): Promise<User[]> {
    if (role) {
      return this.userRepository.find({ where: { role: role as UserRole } });
    }
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (data.role === UserRole.ROLE_ADMIN && user.role !== UserRole.ROLE_ADMIN) {
      const adminExists = await this.userRepository.findOne({ where: { role: UserRole.ROLE_ADMIN } });
      if (adminExists) {
        throw new ConflictException('Já existe um usuário admin. Apenas um usuário admin é permitido.');
      }
    }
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}