import { TypeService } from '../../../../prisma/generated/prisma/enums.js';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @IsEnum(TypeService)
  type: TypeService;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsString()
  veterinaryId: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
