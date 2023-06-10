import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from 'src/enums';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsOptional()
  image: string;
}

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
