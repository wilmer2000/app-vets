import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../core/modules/user/services/user.service';
import { User } from '../../../../core/modules/user/interfaces/user.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-entity-list',
  imports: [DatePipe, IconComponent, RouterLink],
  templateUrl: './entity-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent {
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
