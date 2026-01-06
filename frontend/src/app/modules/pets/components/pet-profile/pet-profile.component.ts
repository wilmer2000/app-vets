import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal
} from '@angular/core';
import { PetService } from '../../services/pet.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, map } from 'rxjs';
import { Pet } from '../../interfaces/pet.interfaces';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { FormControl, FormGroup } from '@angular/forms';
import { InputFormComponent } from '../../../../core/modules/form/input-form/input-form.component';
import { PetSex } from '../../enums/pet.enum';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-pets-profile',
  imports: [ContainerComponent, InputFormComponent, KeyValuePipe],
  templateUrl: './pet-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetProfileComponent implements OnInit {
  private readonly petService = inject(PetService);
  private readonly destroyRef = inject(DestroyRef);

  petId = input.required<string>();
  petDetail = signal<Pet | undefined>(undefined);
  loading = signal(false);
  form = signal(
    new FormGroup({
      name: new FormControl(''),
      breed: new FormControl(''),
      sex: new FormControl('')
    })
  );

  ngOnInit() {
    this.loading.set(true);
    this.petService
      .getProfile(this.petId())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((pet: Pet) => this.setValues(pet)),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  private setValues(pet: Pet): void {
    this.petDetail.set(pet);
    this.form().patchValue(pet);
    this.form().updateValueAndValidity();
  }

  protected readonly PetSex = PetSex;
}
