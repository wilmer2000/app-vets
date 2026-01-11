import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddressUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty() // Ensures it's not "" or " "
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  street?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty() // Ensures it's not "" or " "
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  city?: string;
}
