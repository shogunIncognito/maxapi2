import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from 'src/models/Car';

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
