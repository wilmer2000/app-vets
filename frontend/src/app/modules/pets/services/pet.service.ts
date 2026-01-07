import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../interfaces/pet.interfaces';

class UpdatePet {}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly apiUrl = '/api/pets';
  private readonly http = inject(HttpClient);

  getProfile(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  create(user: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}`, user);
  }

  findAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}`);
  }

  findAllByOwner(ownerId: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/owner/${ownerId}`);
  }

  findOne(petId: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${petId}`);
  }

  update(petId: string, values: UpdatePet): Observable<any> {
    return this.http.put(`${this.apiUrl}/${petId}`, values);
  }

  delete(petId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${petId}`);
  }
}
