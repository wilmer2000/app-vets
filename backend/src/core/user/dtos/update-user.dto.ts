import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
  'password',
]) {}
