import { Component, inject, linkedSignal, Signal } from '@angular/core';
import { ProfileService } from '../../../../core/modules/auth/services/profile.service';
import { User } from '../../../../core/modules/user/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets-list',
  imports: [],
  templateUrl: './pets-grid.component.html'
})
export class PetsGridComponent {
  private readonly accountService = inject(ProfileService);
  private readonly router = inject(Router);

  currentUser: Signal<User> = this.accountService.currentUser as Signal<User>;
  pets = linkedSignal(() => {
    const user = this.currentUser();
    return user.ownerProfile ? user.ownerProfile.pets : [];
  });

  addPet(): void {
    this.router.navigateByUrl(`pet/add`).then();
  }

  viewPet(petId: string): void {
    this.router.navigateByUrl(`pet/profile/${petId}`).then();
  }
}
