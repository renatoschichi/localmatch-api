import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { AdminCreateUserDto } from './admin-create-user.dto';
import { AdminUpdateUserDto } from './admin-update-user.dto';
import { AdminOnlyGuard } from 'src/auth/guards/admin-only.guard';
import { SelfOrAdminGuard } from 'src/auth/guards/self-or-admin.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @ApiBody({ type: AdminCreateUserDto })
  @ApiCreatedResponse({ type: User, description: 'Usuário criado com sucesso' })
  create(@Body() adminCreateUserDto: AdminCreateUserDto): Promise<User> {
    return this.usersService.create(adminCreateUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  findAll(@Query('role') role?: string): Promise<User[]> {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  update(@Param('id') id: string, @Body() adminUpdateUserDto: AdminUpdateUserDto): Promise<User> {
    return this.usersService.update(+id, adminUpdateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}