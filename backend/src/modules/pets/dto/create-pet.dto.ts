import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PetSex } from '../../../../prisma/generated/prisma/enums.js';

export class CreatePetDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  breed: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @ApiProperty()
  @IsEnum(PetSex)
  sex: PetSex;

  @ApiProperty()
  @IsOptional()
  @IsString()
  veterinaryId: string;
}
