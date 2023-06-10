import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/User';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return await this.userModel.find({});
  }

  async getUser(id: string) {
    return await this.userModel.findById(id);
  }

  async createUser(user: CreateUserDTO) {
    try {
      return await this.userModel.create(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async updateUser(id: string, newUserValues: UpdateUserDTO) {
    newUserValues.password &&= await this.hashPassword(newUserValues.password);
    if (newUserValues.image) {
      //... upload image
    }
    return await this.userModel.findByIdAndUpdate(id, newUserValues);
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
}
