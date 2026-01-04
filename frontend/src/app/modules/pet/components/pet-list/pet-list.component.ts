import { Component, inject, linkedSignal, Signal } from '@angular/core';
import { ProfileService } from '../../../../core/modules/auth/services/profile.service';
import { User } from '../../../../core/modules/user/interfaces/user.interface';

@Component({
  selector: 'app-pet-list',
  imports: [],
  templateUrl: './pet-list.component.html'
})
export class PetListComponent {
  private readonly accountService = inject(ProfileService);
  currentUser: Signal<User> = this.accountService.currentUser as Signal<User>;
  pets = linkedSignal(() => {
    const user = this.currentUser();
    return user.ownerProfile ? user.ownerProfile.pets : [];
  });

  addPet(): void {

  };
}
