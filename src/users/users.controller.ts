import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get('info')
  async getUserInfo(@Req() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    const userExists = await this.usersService.getUserByName(user.username);
    if (userExists) throw new BadRequestException('User already exists');
    return await this.usersService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() newUserValues: UpdateUserDTO,
  ) {
    const user = await this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    return await this.usersService.updateUser(id, newUserValues);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/image')
  async updateImage(@Param('id') id: string, @Body() values: UpdateUserDTO) {
    const user = await this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');

    return await this.usersService.updateUserImage(id, values.image);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    return await this.usersService.deleteUser(id);
  }
}
