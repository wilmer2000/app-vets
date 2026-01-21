import { CreateConfigurationDto } from './create-configuration.dto.js';
import { OmitType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class UpdateConfigurationDto extends OmitType(CreateConfigurationDto, [
  'entityId',
]) {
  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsOptional()
  color1: string;

  @IsString()
  @IsOptional()
  color2: string;
}
