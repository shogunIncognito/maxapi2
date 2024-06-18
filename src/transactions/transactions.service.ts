import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Buyer } from 'src/models/Buyer';
import { Transaction } from 'src/models/Transaction';
import { BuyerDTO, TransactionDTO } from './transaction.dto';
import { Car } from 'src/models/Car';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Buyer.name) private buyerModel: Model<Buyer>,
    @InjectModel(Car.name) private carModel: Model<Car>,
  ) {}

  async getTransactions() {
    return await this.transactionModel.find().populate(['buyer', 'car']);
  }

  async createTransaction(transaction: TransactionDTO) {
    const existBuyer = await this.buyerModel.findOne({
      cc: transaction.buyer.cc,
    });

    const buyer =
      existBuyer || (await this.buyerModel.create(transaction.buyer));

    // si se marco como vendido el carro se actualiza el estado del carro
    // y se oculta de la lista de carros disponibles
    if (transaction.sold) {
      await this.carModel.findOneAndUpdate(
        { _id: transaction.car },
        { sold: true, show: false },
      );
    }

    return await this.transactionModel.create({
      ...transaction,
      buyer: buyer._id,
    });
  }
}
