import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/User';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return await this.userModel.find(
      { username: { $ne: 'admin' } },
      { password: 0 },
    );
  }

  async getUser(id: string) {
    try {
      return await this.userModel.findById(id, { password: 0 });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error getting user');
    }
  }

  async getUserByName(name: string) {
    return await this.userModel.findOne({ username: name }, { password: 0 });
  }

  async createUser(user: CreateUserDTO) {
    try {
      const newUser = {
        ...user,
        password: await this.hashPassword(user.password),
        image: null,
      };
      return await this.userModel.create(newUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async updateUser(id: string, newUserValues: UpdateUserDTO) {
    try {
      if (newUserValues.password) {
        const { password, currentPassword } = newUserValues;

        const user = await this.userModel.findById(id);
        const isPasswordCorrect = await bcrypt.compare(
          currentPassword,
          user.password,
        );

        if (!isPasswordCorrect) throw new Error('Invalid password to update');

        newUserValues.password = await this.hashPassword(password);
      }

      return await this.userModel.findByIdAndUpdate(id, newUserValues);
    } catch (error) {
      console.log(error);
      if (error.message === 'Invalid password to update')
        throw new BadRequestException(error.message);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async updateUserImage(id: string, image: string) {
    try {
      return await this.userModel.findByIdAndUpdate(id, { image });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error updating user image');
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error deleting user');
    }
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
}
