import { Controller, Get } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private carsServices: CarsService) {}

  @Get()
  async getCars() {
    return this.carsServices.getCars();
  }
}
