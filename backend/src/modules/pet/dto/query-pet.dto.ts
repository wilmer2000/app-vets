import { CreatePetDto } from './create-pet.dto.js';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryPetDto extends CreatePetDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  breed: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  clientId: string;
}
