import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { AdminCreateUserDto } from './admin-create-user.dto';
import { AdminUpdateUserDto } from './admin-update-user.dto';
import { AdminOnlyGuard } from 'src/auth/guards/admin-only.guard';
import { SelfOrAdminGuard } from 'src/auth/guards/self-or-admin.guard';
import { AdminCreationGuard } from 'src/auth/guards/admin-creation.guard';
import { CreateUserDto } from './create-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiBody({ type: AdminCreateUserDto })
  @ApiCreatedResponse({ type: User, description: 'Usuário criado com sucesso' })
  create(@Body() adminCreateUserDto: AdminCreateUserDto): Promise<User> {
    return this.usersService.create(adminCreateUserDto);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('role') role?: string): Promise<User[]> {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() adminUpdateUserDto: AdminUpdateUserDto): Promise<User> {
    return this.usersService.update(+id, adminUpdateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}