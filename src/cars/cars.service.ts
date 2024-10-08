import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Car } from 'src/models/Car';
import { CarDTO, UpdateCarDTO } from './car.dto';
import { Brand } from 'src/models/Brands';
import { upperText } from 'src/utils/upperText';
import { QueryCar } from 'src/types';
import { Transaction } from 'src/models/Transaction';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private CarModel: Model<Car>,
    @InjectModel(Brand.name) private BrandModel: Model<Brand>,
    @InjectModel(Transaction.name) private TransactionModel: Model<Transaction>,
  ) {}

  async getCarTransactions(carId: Types.ObjectId) {
    try {
      return (await this.TransactionModel.find({ car: carId })).length;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error getting transactions');
    }
  }

  async getCars(query: QueryCar) {
    try {
      const searchTerms = query.search?.split(' ');

      // esto podria ser "search='example' o e.g "model=2020"
      const [filterType, filterValue] =
        Object.entries(query)[4] || Object.entries(query)[3] || [];

      const keyword = searchTerms
        ? {
            $and: searchTerms.map((term) => ({
              $or: [
                { brand: { $regex: term, $options: 'i' } },
                { line: { $regex: term, $options: 'i' } },
                { color: { $regex: term, $options: 'i' } },
                { plate: { $regex: term, $options: 'i' } },
                { model: isNaN(Number(term)) ? null : term },
              ],
            })),
          }
        : filterType === undefined || !filterValue
        ? {}
        : {
            [filterType]: isNaN(Number(filterValue))
              ? { $regex: filterValue, $options: 'i' }
              : { $lte: Number(filterValue) },
          };

      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;

      const filter = {
        ...keyword,
        show: query.show ? query.show === 'true' : true,
        sold: query.sold ? query.sold === 'true' : false,
      };

      if (!query.show) delete filter.show;
      if (!query.sold) delete filter.sold;

      const carsPagination = await this.CarModel.find(filter)
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ createdAt: -1 });

      const result = await Promise.all(
        carsPagination.map(async (car) => {
          const carTransactions = await this.getCarTransactions(car._id);
          return {
            ...car.toObject(),
            transactions: carTransactions,
          };
        }),
      );

      const totalPages = Math.ceil(
        (await this.CarModel.countDocuments(filter)) / limit,
      );

      return { result, totalPages, currentPage: page };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error getting cars');
    }
  }

  async getAllCars() {
    try {
      return await this.CarModel.find({});
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

  async getAvailableBrands() {
    try {
      return await this.CarModel.distinct('brand');
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
