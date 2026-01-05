import { Component, inject, linkedSignal, Signal } from '@angular/core';
import { User } from '../../../../core/modules/user/interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/modules/user/services/user.service';

@Component({
  selector: 'app-pets-list',
  imports: [],
  templateUrl: './pets-grid.component.html'
})
export class PetsGridComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  currentUser = this.userService.currentUser as Signal<User>;
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
