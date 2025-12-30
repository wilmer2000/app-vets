import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';


export class PasswordResetDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;
}
