import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { TOKEN_KEY } from '../../storage/constants/constant';
import { StorageService } from '../../storage/services/storage.service';
import { Role } from '../enums/auth.enum';
import { AuthState } from '../interfaces/auth.interface';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/api/auth';
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);
  private readonly userService = inject(UserService);
  private readonly authState = signal<AuthState>({
    isLoggedIn: !!this.storage.get(TOKEN_KEY),
    role: undefined,
    userId: undefined
  });

  readonly state = this.authState.asReadonly();
  readonly currentUser = signal<User | undefined>(undefined);
  readonly isLoggedIn = computed(() => this.state().isLoggedIn);
  readonly userRole = computed(() => this.state().role);

  constructor() {
    this.initializeAuth();
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      switchMap((res) => {
        const token = res[TOKEN_KEY];
        if (!token) return EMPTY;

        this.saveSession(token);
        return this.fetchProfile();
      })
    );
  }

  logout(): void {
    this.storage.remove(TOKEN_KEY);
    this.authState.set({ isLoggedIn: false, role: undefined, userId: undefined });
    this.currentUser.set(undefined);
  }

  private initializeAuth(): void {
    const token = this.storage.get(TOKEN_KEY);
    if (token) {
      this.saveSession(token as string);
      this.fetchProfile().subscribe();
    }
  }

  private fetchProfile(): Observable<User> {
    const { userId } = this.authState();
    if (!userId) return EMPTY;

    return this.userService.findOne(userId).pipe(tap((user) => this.currentUser.set(user)));
  }

  private saveSession(token: string): void {
    const decoded = this.decodeToken(token);
    if (!decoded) return;

    this.storage.set(TOKEN_KEY, token);
    this.authState.set({
      isLoggedIn: true,
      role: decoded.role as Role,
      userId: decoded.sub
    });
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      this.logout();
      return null;
    }
  }
}
