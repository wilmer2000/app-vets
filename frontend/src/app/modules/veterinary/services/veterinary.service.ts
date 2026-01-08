import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {
  private readonly apiUrl = '/api/veterinary';
  private readonly http = inject(HttpClient);

  create(): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
  }
  findAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
  }
  findOne(): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
  }
  findByUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
  }
  update(): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
  }
  delete(): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
  }
}
