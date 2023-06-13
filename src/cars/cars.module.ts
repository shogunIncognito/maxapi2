import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from 'src/models/Car';
import { Brand, BrandSchema } from 'src/models/Brands';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: Brand.name, schema: BrandSchema },
    ]),
  ],
  providers: [CarsService],
  controllers: [CarsController],
})
export class CarsModule {}
