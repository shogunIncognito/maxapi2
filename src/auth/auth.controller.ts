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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
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

  @ApiBody({ schema: { example: { token: 'd789as7d9as7ddas' } } })
  @Post('validate-token')
  async validateToken(@Body() body: { token: string }) {
    return await this.authService.validateToken(body.token);
  }

  @UseGuards(AuthGuard)
  @Post('validate-password')
  async validatePassword(@Body() body: { password: string }, @Req() req: any) {
    const user = await this.authService.validUser(req.user.username);
    return this.authService.validPassword(body.password, user.password);
  }
}
