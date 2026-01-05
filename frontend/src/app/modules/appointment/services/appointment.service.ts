import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, UpdateAppointment } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly apiUrl = '/api/appointment';
  private readonly http = inject(HttpClient);

  create(user: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}`, user);
  }
  findAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}`);
  }
  findOne(appointmentId: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${appointmentId}`);
  }
  update(appointmentId: string, values: UpdateAppointment): Observable<any> {
    return this.http.put(`${this.apiUrl}/${appointmentId}`, values);
  }
  delete(appointmentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${appointmentId}`);
  }
}
