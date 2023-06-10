import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/models/Car';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private CarModel: Model<Car>) {}

  async getCars() {
    return this.CarModel.find({}).sort({ createdAt: -1 });
  }

  // async createCar(car: CarDTO) {}
}
