import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarDTO, UpdateCarDTO } from './car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsServices: CarsService) {}

  @Get()
  async getCars() {
    return await this.carsServices.getCars();
  }

  @Get(':id')
  async getCar(@Param('id') id: string) {
    const existCar = await this.carsServices.getCar(id);
    if (!existCar) throw new NotFoundException('Car not found');
    return existCar;
  }

  @Post()
  async createCar(@Body() car: CarDTO) {
    return await this.carsServices.createCar(car);
  }

  @Patch(':id')
  async updateCar(@Param('id') id: string, @Body() car: UpdateCarDTO) {
    const existCar = await this.carsServices.getCar(id);
    if (!existCar) throw new NotFoundException('Car not found');
    return await this.carsServices.updateCar(id, car);
  }

  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    const existCar = await this.carsServices.getCar(id);
    if (!existCar) throw new NotFoundException('Car not found');
    return await this.carsServices.deleteCar(id);
  }
}
