import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;
}
