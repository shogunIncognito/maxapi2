import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/User';
import { UserToSign } from 'src/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private configService: ConfigService,
    private JwtServices: JwtService,
  ) {}

  async login(user: UserToSign) {
    try {
      const token = this.JwtServices.sign(user, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      return { token, ...user };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error signing token');
    }
  }

  async validUser(username: string) {
    return await this.UserModel.findOne({
      username: username.toLowerCase(),
    });
  }

  async validPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
