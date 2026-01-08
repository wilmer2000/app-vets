import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal
} from '@angular/core';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { InputFormComponent } from '../../../../core/modules/form/input-form/input-form.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../../core/modules/user/services/user.service';
import { OwnerProfile, User } from '../../../../core/modules/user/interfaces/user.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, forkJoin, map } from 'rxjs';
import { Pet } from '../../../pets/interfaces/pet.interfaces';
import { PetService } from '../../../pets/services/pet.service';
import { ServicesService } from '../../../services/services/services.service';
import { SelectOption } from '../../../../core/modules/form/interfaces/form.interface';

@Component({
  selector: 'app-create-appointment',
  imports: [ContainerComponent, InputFormComponent, LoaderComponent],
  templateUrl: './create-appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAppointmentComponent implements OnInit {
  private readonly petService = inject(PetService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly userService = inject(UserService);
  private readonly service = inject(ServicesService);

  currentUser = this.userService.currentUser as Signal<User>;
  loading = signal(false);
  form = signal(
    new FormGroup({
      pets: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      service: new FormControl('')
    })
  );
  pets = signal<Pet[]>([]);
  servicesOptions = signal<SelectOption[]>([]);

  ngOnInit() {
    const owner = this.currentUser().ownerProfile as OwnerProfile;

    this.loading.set(true);
    forkJoin([
      this.service.findByVeterinary(owner.veterinary),
      this.petService.findAllByOwner(owner.id)
    ])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(([services, pets]) => {
          const options = services.map((service) => {
            return { label: service.name, key: service.id } as SelectOption;
          });

          this.pets.set(pets);
          this.servicesOptions.set(options);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }
}
