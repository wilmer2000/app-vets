import { OmitType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto.js';

export class UpdateServiceDto extends OmitType(CreateServiceDto, ['veterinaryId']) {}
