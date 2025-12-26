import { PartialType } from '@nestjs/mapped-types';
import { CreateVeterinaryDto } from './create-veterinary.dto.js';

export class UpdateVeterinaryDto extends PartialType(CreateVeterinaryDto) {}
