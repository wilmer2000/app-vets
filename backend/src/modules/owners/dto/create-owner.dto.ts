import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  password: string;
  name: string;
  lastname: string;
  isActive: boolean;
}
