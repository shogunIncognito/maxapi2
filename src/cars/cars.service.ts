import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/models/Car';
import { CarDTO, UpdateCarDTO } from './car.dto';
import { Brand } from 'src/models/Brands';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private CarModel: Model<Car>,
    @InjectModel(Brand.name) private BrandModel: Model<Brand>,
  ) {}

  async getCars() {
    try {
      return await this.CarModel.find({}).sort({ createdAt: -1 });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error getting cars');
    }
  }

  async getCar(id: string) {
    try {
      return await this.CarModel.findById(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error getting car');
    }
  }

  async getCarImages(id: string) {
    return await this.CarModel.findById(id).select('images');
  }

  async createCar(car: CarDTO) {
    try {
      return await this.CarModel.create(car);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating car');
    }
  }

  async updateCar(id: string, newCarValues: UpdateCarDTO) {
    try {
      if (newCarValues?.images) {
        newCarValues.preview = newCarValues.images[0];
      }
      return await this.CarModel.findByIdAndUpdate(id, newCarValues, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error updating car');
    }
  }

  async deleteCar(id: string) {
    try {
      return await this.CarModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error deleting car');
    }
  }

  async createBrand(brand: string) {
    try {
      return await this.BrandModel.create({ name: brand });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating brand');
    }
  }

  async getBrands() {
    try {
      return await this.BrandModel.find({});
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error getting brands');
    }
  }
}
