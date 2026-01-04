import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateUser, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = '/api/user';
  private readonly http = inject(HttpClient);

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
  findOne(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
  update(userId: string, values: UpdateUser): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, values);
  }
  delete(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
