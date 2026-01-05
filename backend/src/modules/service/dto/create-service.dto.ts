import { TypeService } from '../../../../prisma/generated/prisma/enums.js';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateServiceDto {
  @ApiProperty()
  @IsEnum(TypeService)
  type: TypeService;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value === 'true' : value,
  )
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  veterinaryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
