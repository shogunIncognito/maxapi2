import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/models/Car';
import { CarDTO, UpdateCarDTO } from './car.dto';
import { Brand } from 'src/models/Brands';
import { upperText } from 'src/utils/upperText';

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

  async createCar(car: CarDTO | CarDTO[]) {
    try {
      if (car instanceof Array) return await this.CarModel.insertMany(car);
      return await this.CarModel.create(car);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating car');
    }
  }

  async updateCar(id: string, newCarValues: UpdateCarDTO) {
    try {
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
      const name = upperText(brand);
      return await this.BrandModel.create({ name });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating brand');
    }
  }

  async deleteBrand(name: string) {
    try {
      return await this.BrandModel.findOneAndDelete({ name });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error deleting brand');
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

  async getBrandById(id: string) {
    try {
      return await this.BrandModel.findById(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error getting brand');
    }
  }

  async getBrandByName(name: string) {
    try {
      const upperBrand = upperText(name);
      return await this.BrandModel.findOne({ name: upperBrand });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error getting brand');
    }
  }

  async deleteManyCars(ids: string[] | string) {
    try {
      return await this.CarModel.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error getting cars');
    }
  }

  async deleteCarImages(carId: string, images: string[], car: Car) {
    try {
      const result = await this.CarModel.findByIdAndUpdate(
        carId,
        {
          $pull: { images: { $in: images } },
        },
        { new: true },
      );

      if (images.includes(car.preview)) {
        return await this.CarModel.findByIdAndUpdate(
          carId,
          {
            preview: '',
          },
          { new: true },
        );
      }

      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error deleting images');
    }
  }
}
