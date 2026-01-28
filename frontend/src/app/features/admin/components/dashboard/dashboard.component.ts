import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Resource } from '../../../../shared/interfaces/resource.interface';
import { Dashboard } from '../../interfaces/dashboard.interface';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-dashboard',
  imports: [LoaderComponent, IconComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly destroyRef = inject(DestroyRef);

  dashboard: Signal<Resource<Dashboard>> = this.dashboardService.data;

  ngOnInit(): void {
    this.dashboardService.getSummary().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
