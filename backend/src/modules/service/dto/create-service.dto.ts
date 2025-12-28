import { TypeService } from '../../../../prisma/generated/prisma/enums.js';
import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  type: TypeService;

  @IsNotEmpty()
  name: string;

  isActive: boolean;
  veterinaryId: string;
}
