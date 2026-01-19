import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
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
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  clientId: string;

  @ApiProperty()
  @IsEnum(PetSex)
  sex: PetSex;
}
