import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ContactUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  @IsOptional()
  @IsDefined({ each: true })
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  @IsOptional()
  @IsDefined({ each: true })
  email?: string;
}
