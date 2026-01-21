import { IsString } from 'class-validator';

export class CreateConfigurationDto {
  @IsString()
  logo: string;

  @IsString()
  color1: string;

  @IsString()
  color2: string;

  @IsString()
  entityId: string;
}
