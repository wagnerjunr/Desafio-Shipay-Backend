import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:'Administrador'
  })
  description: string;
}