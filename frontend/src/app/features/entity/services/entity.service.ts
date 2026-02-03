import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity, UpdateEntity } from '../interfaces/entity.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private readonly apiUrl = '/api/entity';
  private readonly http = inject(HttpClient);

  create(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(`${this.apiUrl}`, entity);
  }
  findAll(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${this.apiUrl}`);
  }
  findOne(entityId: string): Observable<Entity> {
    return this.http.get<Entity>(`${this.apiUrl}/${entityId}`);
  }
  update(entityId: string, values: UpdateEntity): Observable<any> {
    return this.http.put(`${this.apiUrl}/${entityId}`, values);
  }
  delete(entityId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${entityId}`);
  }
}
