import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private statsServices: StatsService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  async getStats() {
    return this.statsServices.getStats();
  }

  @HttpCode(204)
  @Post()
  async addView(@Body('time') time: number) {
    return this.statsServices.addView(time);
  }
}
