import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CarDTO {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  line: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  kilometers: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  description: string;

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

  @IsString()
  @IsNotEmpty()
  owners: string;

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
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  kilometers: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  images: Array<string>;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  price: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  description: string;

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
  @IsString()
  @IsNotEmpty()
  owners: string;

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
}
