import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CarDTO {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  model: number;

  @IsNumber()
  @IsNotEmpty()
  kilometers: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  images: Array<File>;

  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateCarDTO {
  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  model: number;

  @IsNumber()
  @IsOptional()
  kilometers: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  images: Array<File>;

  @IsString()
  @IsOptional()
  description: string;
}
