import { TypeService } from '../../../../prisma/generated/prisma/enums.js';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsEnum(TypeService)
  type: TypeService;

  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isActive: boolean;

  veterinaryId: string;
}
