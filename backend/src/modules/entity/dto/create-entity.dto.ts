import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AddressEntityDto } from './address-entity.dto.js';
import { ContactEntityDto } from './contact-entity.dto.js';

export class CreateEntityDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  name: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  description: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }): boolean =>
    typeof value === 'string' ? value === 'true' : value,
  )
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactEntityDto)
  contact?: ContactEntityDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressEntityDto)
  address?: AddressEntityDto;
}
