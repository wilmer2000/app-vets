import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TypeService } from '../../../../prisma/generated/prisma/enums.js';

export class CreateServiceDto {
  @ApiProperty()
  @Transform(({ value }): boolean =>
    typeof value === 'string' ? value === 'true' : value,
  )
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsEnum(TypeService)
  type: TypeService;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  entityId: string;
}
