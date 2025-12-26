import { IsNotEmpty } from 'class-validator';

export class CreateVeterinaryDto {
  @IsNotEmpty()
  name: string;
}
