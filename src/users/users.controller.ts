import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Req, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req): Promise<User> {
    const userId = req.user.id;
    return this.usersService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(@Req() req, @Body() body: Partial<User>): Promise<User> {
    const userId = req.user.id;
    return this.usersService.update(userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async removeMe(@Req() req): Promise<void> {
    const userId = req.user.id;
    return this.usersService.remove(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }
}