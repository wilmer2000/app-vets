import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiUrl = '/api/dashboard';
  private readonly http = inject(HttpClient);

  getSummary(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/admin`);
  }
}
