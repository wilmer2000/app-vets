import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private readonly apiUrl = '/api/entity';
}
