import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @IsOptional()
  @IsString()
  password?: string;
}