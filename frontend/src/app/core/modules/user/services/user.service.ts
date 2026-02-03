import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { UpdateUser, User } from '../interfaces/user.interface';
import { RedirectService } from '../../auth/services/redirect.service';
import { Role } from '../../auth/enums/auth.enum';
import { ModalService } from '../../../../shared/services/modal.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = '/api/user';
  private readonly profileApiUrl = '/api/profile';
  private readonly http = inject(HttpClient);
  private readonly redirectService = inject(RedirectService);
  private readonly modalService = inject(ModalService);

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

  create(user: Partial<User>): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user).pipe(
      map(() =>
        this.modalService.alert('Creación de usuario', 'El usuario se ha creado exitosamente'),
      ),
      catchError(() => {
        this.modalService.alert('Error', 'El usuario NO se ha creado exitosamente', 'error');

        throw new Error('Error al crear usuario');
      }),
    );
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
