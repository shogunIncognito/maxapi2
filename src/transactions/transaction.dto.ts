import { IsString, IsNumber, IsObject, IsBoolean } from 'class-validator';

export class BuyerDTO {
  @IsNumber()
  cc: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsNumber()
  phone: number;
}

export class TransactionDTO {
  @IsObject()
  buyer: BuyerDTO;

  @IsString()
  car: string;

  @IsNumber()
  price: number;

  @IsString()
  date: Date;

  @IsBoolean()
  sold: boolean;
}
