import { CreateServiceDto } from './create-service.dto.js';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateServiceDto extends OmitType(CreateServiceDto, [
  'entityId',
]) {}
