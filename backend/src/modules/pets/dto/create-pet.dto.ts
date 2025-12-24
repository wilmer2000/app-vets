import { IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  breedId: string;

  @IsNotEmpty()
  veterinaryId: string;

  @IsNotEmpty()
  ownerId: string;
}
