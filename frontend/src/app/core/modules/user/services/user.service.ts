import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UpdateUser, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = '/api/user';
  private readonly profileApiUrl = '/api/profile';
  private readonly http = inject(HttpClient);

  readonly currentUser = signal<User | null>(null);

  getCurrentUser(id: string): Observable<void> {
    return this.http
      .get<User>(`${this.profileApiUrl}/${id}`)
      .pipe(map((user) => this.currentUser.set(user)));
  }
  getProfile(id: string): Observable<User> {
    return this.http.get<User>(`${this.profileApiUrl}/${id}`);
  }

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
