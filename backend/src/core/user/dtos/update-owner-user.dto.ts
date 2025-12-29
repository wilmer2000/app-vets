import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnerUserDto } from './create-owner-user.dto.js';

export class UpdateOwnerUserDto extends PartialType(CreateOwnerUserDto) {}
