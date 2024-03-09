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
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private carsServices: CarsService) {}

  @ApiResponse({ status: 200, description: 'Get all cars', type: [CarDTO] })
  @Get()
  async getCars() {
    return await this.carsServices.getCars();
  }

  @ApiResponse({
    status: 201,
    description: 'Create a new brand',
    schema: {
      example: {
        brand: 'BMW',
      },
    },
  })
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post('brands')
  async createBrand(@Body() brand: { name: string }) {
    const existBrand = await this.carsServices.getBrandByName(brand.name);

    if (existBrand) throw new BadRequestException('Brand already exist');
    return await this.carsServices.createBrand(brand.name);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all brands',
  })
  @UseGuards(AuthGuard)
  @Get('brands')
  async getBrands() {
    return await this.carsServices.getBrands();
  }

  @ApiResponse({ status: 200, description: 'Get brand by id' })
  @UseGuards(AuthGuard)
  @Get('brands/:id')
  async getBrand(@Param('id') id: string) {
    const brand = await this.carsServices.getBrandById(id);
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  @ApiResponse({ status: 201, description: 'Create a new car' })
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post()
  async createCar(@Body() car: CarDTO | CarDTO[]) {
    return await this.carsServices.createCar(car);
  }

  @ApiResponse({ status: 200, description: 'Delete a car' })
  @UseGuards(AuthGuard)
  @Delete('brands/:name')
  async deleteBrand(@Param('name') name: string) {
    const existBrand = await this.carsServices.getBrandByName(name);
    if (!existBrand) throw new NotFoundException('Brand not found');
    return this.carsServices.deleteBrand(name);
  }

  @ApiResponse({ status: 200, description: 'Get car images' })
  @Get(':id/images')
  async getImages(@Param('id') id: string) {
    return this.carsServices.getCarImages(id);
  }

  @ApiResponse({ status: 200, description: 'Get car by id' })
  @Get(':id')
  async getCar(@Param('id') id: string) {
    const existCar = await this.carsServices.getCar(id);
    if (!existCar) throw new NotFoundException('Car not found');
    return existCar;
  }

  @ApiResponse({ status: 200, description: 'Update a car' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateCar(@Param('id') id: string, @Body() car: UpdateCarDTO) {
    const existCar = await this.carsServices.getCar(id);
    if (!existCar) throw new NotFoundException('Car not found');
    return await this.carsServices.updateCar(id, car);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete many cars with an array of ids',
  })
  @ApiParam({ name: 'ids', type: 'string', example: 'ids=1,ids=2,ids=3' })
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
