import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  BadRequestException,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarDTO, UpdateCarDTO } from './car.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('cars')
export class CarsController {
  constructor(private carsServices: CarsService) {}

  @Get()
  async getCars() {
    return await this.carsServices.getCars();
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Post('brands')
  async createBrand(@Body() brand: { brand: string }) {
    const existBrand = await this.carsServices.getBrandByName(brand.brand);
    console.log(existBrand);

    if (existBrand) throw new BadRequestException('Brand already exist');
    return await this.carsServices.createBrand(brand.brand);
  }

  @UseGuards(AuthGuard)
  @Get('brands')
  async getBrands() {
    return await this.carsServices.getBrands();
  }

  @UseGuards(AuthGuard)
  @Get('brands/:id')
  async getBrand(@Param('id') id: string) {
    const brand = await this.carsServices.getBrandById(id);
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  async createCar(@Body() car: CarDTO) {
    return await this.carsServices.createCar(car);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete('brands/:name')
  async deleteBrand(@Param('name') name: string) {
    const existBrand = await this.carsServices.getBrandByName(name);
    if (!existBrand) throw new NotFoundException('Brand not found');
    return this.carsServices.deleteBrand(name);
  }

  @UseGuards(AuthGuard)
  @Get(':id/images')
  async getImages(@Param('id') id: string) {
    return this.carsServices.getCarImages(id);
  }

  @Get(':id')
  async getCar(@Param('id') id: string) {
    const existCar = await this.carsServices.getCar(id);
    if (!existCar) throw new NotFoundException('Car not found');
    return existCar;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateCar(@Param('id') id: string, @Body() car: UpdateCarDTO) {
    const existCar = await this.carsServices.getCar(id);
    if (!existCar) throw new NotFoundException('Car not found');
    return await this.carsServices.updateCar(id, car);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteCars(@Query() params: { ids: string[] | string }) {
    const deletedCars = await this.carsServices.deleteManyCars(params.ids);
    if (deletedCars.deletedCount === 0)
      throw new BadRequestException('No cars deleted');
    return deletedCars;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    const existCar = await this.carsServices.getCar(id);
    if (!existCar) throw new NotFoundException('Car not found');
    return await this.carsServices.deleteCar(id);
  }
}
