import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:'Wagner'
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
   example:'wagner@gmail.com'
  })
  email: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example:1
  })
  roleId: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  password?: string;
}