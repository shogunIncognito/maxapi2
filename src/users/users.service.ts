import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
    return await this.userModel.find({}, { password: 0 });
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
      };
      return await this.userModel.create(newUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async updateUser(id: string, newUserValues: UpdateUserDTO) {
    try {
      newUserValues.password &&= await this.hashPassword(
        newUserValues.password,
      );

      return await this.userModel.findByIdAndUpdate(id, newUserValues);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error updating user');
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
