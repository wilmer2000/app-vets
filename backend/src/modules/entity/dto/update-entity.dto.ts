import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEntityDto } from './create-entity.dto.js';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateEntityDto extends PartialType(CreateEntityDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  description: string;
}
