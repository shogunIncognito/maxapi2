import { Controller, Get, Post, UseGuards } from '@nestjs/common';
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

  @Post()
  async addView() {
    return this.statsServices.addView();
  }
}
