import { IsNotEmpty } from 'class-validator';
import { Specialty } from '../../../../prisma/generated/prisma/client.js';

export class CreateVetDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  specialty: Specialty;
}
