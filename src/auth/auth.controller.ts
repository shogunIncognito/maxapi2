import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDTO) {
    const { username, password } = user;

    const existUser = await this.authService.validUser(username);

    if (!existUser) throw new UnauthorizedException('Invalid credentials');

    const isPasswordCorrect = await this.authService.validPassword(
      password,
      existUser.password,
    );
    if (!isPasswordCorrect)
      throw new UnauthorizedException('Invalid credentials');

    return this.authService.login({
      _id: existUser._id,
      username: existUser.username,
      role: existUser.role,
      image: existUser.image,
    });
  }

  @UseGuards(AuthGuard)
  @Post('validate-password')
  async validatePassword(@Body() body: { password: string }, @Req() req: any) {
    const user = await this.authService.validUser(req.user.username);
    return this.authService.validPassword(body.password, user.password);
  }
}
