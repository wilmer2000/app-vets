import { IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ownerId: string;

  breedId: string;
  veterinaryId: string;
}
