import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Specialty } from '../../../../prisma/generated/prisma/enums.js';

export class CreateStaffDto {
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

  @ApiProperty()
  @IsEnum(Specialty)
  specialty: Specialty;
}
