import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../interfaces/service.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private readonly apiUrl = '/api/service';
  private readonly http = inject(HttpClient);

  create(values: Service): Observable<any> {
    return this.http.post(`${this.apiUrl}`, values);
  }
  findAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  findOne(serviceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${serviceId}`);
  }
  findByVeterinary(veterinaryId: string): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/veterinary/${veterinaryId}`);
  }
  update(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  delete(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
