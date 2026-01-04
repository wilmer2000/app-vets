import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOwnerUserDto {
  @ApiProperty()
  @IsArray()
  pets: string[];
}
