import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';

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
      ...existUser,
    });
  }
}
