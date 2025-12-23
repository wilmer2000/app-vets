import { Injectable } from '@nestjs/common';
import { CreateVetDto } from './dto/create-vet.dto.js';
import { UpdateVetDto } from './dto/update-vet.dto.js';

@Injectable()
export class VetsService {
  create(createVetDto: CreateVetDto) {
    return 'This action adds a new vet';
  }

  findAll() {
    return `This action returns all vets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vet`;
  }

  update(id: number, updateVetDto: UpdateVetDto) {
    return `This action updates a #${id} vet`;
  }

  remove(id: number) {
    return `This action removes a #${id} vet`;
  }
}
