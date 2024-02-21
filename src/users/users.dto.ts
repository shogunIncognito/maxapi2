import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/enums';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  currentPassword: string;

  @IsString()
  @IsIn([Role.admin, Role.user])
  @IsNotEmpty()
  @IsOptional()
  role: Role;

  @IsOptional()
  image: any;
}
