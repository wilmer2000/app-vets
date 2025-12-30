import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';


export class PasswordChangeDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}
