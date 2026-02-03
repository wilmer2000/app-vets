import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Entity } from '../../interfaces/entity.interface';

@Component({
  selector: 'app-entity-list',
  imports: [DatePipe, IconComponent, RouterLink],
  templateUrl: './entity-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent implements OnInit {
  private readonly entityService = inject(EntityService);
  private readonly destroyRef = inject(DestroyRef);

  entities = signal<Entity[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.entityService
      .findAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((data) => this.entities.set(data));
  }
}
