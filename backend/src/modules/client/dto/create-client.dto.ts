import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateClientDto {
  @ApiProperty()
  @Transform(({ value }): string | never => {
    return typeof value === 'string' ? value.trim() : value;
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }): boolean =>
    typeof value === 'string' ? value === 'true' : value,
  )
  @IsBoolean()
  isActive: boolean;
}
