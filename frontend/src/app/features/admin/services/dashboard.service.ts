import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { Dashboard } from '../interfaces/dashboard.interface';
import { ResourceService } from '../../../shared/services/resource.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends ResourceService<Dashboard> {
  private readonly apiUrl = '/api/dashboard';
  private readonly http = inject(HttpClient);

  getSummary(): Observable<any> {
    this.setLoading(true);
    return this.http.get<Dashboard>(`${this.apiUrl}/admin`).pipe(
      map((data: Dashboard) => this.setData(data)),
      finalize(() => this.setLoading(false)),
    );
  }
}
