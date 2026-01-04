import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddressUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  country: string;
}
