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
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  cc: number;

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
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  cc: number;

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
}
