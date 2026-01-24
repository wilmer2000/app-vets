import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, map, Observable } from 'rxjs';
import { TOKEN_KEY } from '../../storage/constants/constant';
import { StorageService } from '../../storage/services/storage.service';
import { AuthState } from '../interfaces/auth.interface';
import { RedirectService } from './redirect.service';
import { Role } from '../enums/auth.enum';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = '/api/auth';
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);
  private readonly redirectService = inject(RedirectService);
  private readonly userService = inject(UserService);
  private readonly authState = signal<AuthState>({
    isLoggedIn: false,
    role: undefined,
    userId: undefined,
  });

  readonly state = this.authState.asReadonly();

  constructor() {
    this.checkAuthState();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map((res) => {
        const token = res[TOKEN_KEY];
        if (!token) return EMPTY;

        this.saveSession(token);
        return res;
      }),
      // switchMap(() => this.userService.getCurrentUser(this.authState().userId as string))
    );
  }

  logout(): void {
    this.storage.remove(TOKEN_KEY);
    this.authState.set({ isLoggedIn: false, role: undefined, userId: undefined });
    this.redirectService.redirectTo('/login');
  }

  private checkAuthState(): void {
    if (this.authState().isLoggedIn) return;

    const token = this.storage.get(TOKEN_KEY) as string | null;
    if (token) {
      this.saveSession(token);
      this.userService.getCurrentUser(this.authState().userId as string).subscribe();
    }
  }

  private saveSession(token: string): void {
    const decoded = this.decodeToken(token);
    if (!decoded) return;

    this.storage.set(TOKEN_KEY, token);
    this.authState.set({
      isLoggedIn: true,
      role: decoded.role as Role,
      userId: decoded.sub,
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
