import { OmitType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto.js';

export class UpdatePetDto extends OmitType(CreatePetDto, [
  'ownerId',
  'veterinaryId',
]) {}
