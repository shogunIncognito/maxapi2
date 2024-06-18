import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CarDTO {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  line: string;

  @IsNumber()
  @IsNotEmpty()
  model: number;

  @IsNumber()
  @IsNotEmpty()
  kilometers: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  cc: string;

  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsString()
  @IsNotEmpty()
  transmission: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  owners: number;

  @IsString()
  @IsNotEmpty()
  plate: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsOptional()
  preview: string;

  @IsString()
  @IsOptional()
  show: string;

  @IsString()
  @IsOptional()
  sold: string;
}

export class UpdateCarDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  line: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  model: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  kilometers: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  images: Array<string>;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cc: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  transmission: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  owners: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  plate: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsOptional()
  @IsString()
  preview: string;

  @IsOptional()
  @IsString()
  show: string;

  @IsOptional()
  @IsString()
  sold: string;
}
