import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PetSex } from '../../../../prisma/generated/prisma/enums.js';

export class CreatePetDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  breed: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PetSex)
  sex: PetSex;
}
