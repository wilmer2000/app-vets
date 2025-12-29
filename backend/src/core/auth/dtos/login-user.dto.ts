import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';


export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
