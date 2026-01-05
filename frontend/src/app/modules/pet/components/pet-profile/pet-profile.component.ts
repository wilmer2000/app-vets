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
import { map } from 'rxjs';
import { Pet } from '../../interfaces/pet.interfaces';
import { ContainerComponent } from '../../../../shared/components/container/container.component';

@Component({
  selector: 'app-pet-profile',
  imports: [ContainerComponent],
  templateUrl: './pet-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetProfileComponent implements OnInit {
  private readonly petService = inject(PetService);
  private readonly destroyRef = inject(DestroyRef);

  petId = input.required<string>();
  petDetail = signal<Pet | undefined>(undefined);
  loading = signal(false);

  ngOnInit() {
    this.loading.set(true);
    this.petService
      .getProfile(this.petId())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((pet: Pet) => this.petDetail.set(pet))
      )
      .subscribe();
  }
}
