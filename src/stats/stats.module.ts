import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stats, StatsSchema } from 'src/models/Stats';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stats.name, schema: StatsSchema }]),
  ],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
