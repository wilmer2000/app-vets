import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [LoaderComponent, IconComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly destroyRef = inject(DestroyRef);

  dashboard = signal({ userCount: 0, entityCount: 0 });
  loading = signal(true);

  ngOnInit(): void {
    this.dashboardService
      .getSummary()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((data) => this.dashboard.set(data));
  }
}
