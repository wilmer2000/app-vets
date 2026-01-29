import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UpdateUser, User } from '../interfaces/user.interface';
import { RedirectService } from '../../auth/services/redirect.service';
import { Role } from '../../auth/enums/auth.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = '/api/user';
  private readonly profileApiUrl = '/api/profile';
  private readonly http = inject(HttpClient);
  private readonly redirectService = inject(RedirectService);

  readonly currentUser = signal<User | null>(null);

  getCurrentUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      map((user) => {
        this.currentUser.set(user);

        const role = user.role as Role;
        this.redirectService.redirectByRol(role);

        return user as User;
      }),
    );
  }

  updateProfile(id: string, values: UpdateUser): Observable<User> {
    return this.http.patch<User>(`${this.profileApiUrl}/${id}`, values);
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
