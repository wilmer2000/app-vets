import { PartialType } from '@nestjs/mapped-types';
import { CreateVetDto } from './create-vet.dto.js';

export class UpdateVetDto extends PartialType(CreateVetDto) {}
