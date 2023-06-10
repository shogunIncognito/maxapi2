import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    return await this.usersService.createUser(user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() newUserValues: UpdateUserDTO,
  ) {
    const user = await this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    return await this.usersService.updateUser(id, newUserValues);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    return await this.usersService.deleteUser(id);
  }
}
