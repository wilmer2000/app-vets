import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { UserService } from '../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [IconComponent, DatePipe, RouterLink],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  users = signal<User[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.userService
      .findAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((data) => this.users.set(data));
  }
}
