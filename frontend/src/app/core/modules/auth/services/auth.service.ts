import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { TOKEN_KEY } from '../../storage/constants/constant';
import { StorageService } from '../../storage/services/storage.service';
import { Role } from '../enums/auth.enum';
import { AuthState } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/api/auth';
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private loginState = signal<AuthState>(this.loadState());

  get isLoggedIn(): boolean {
    return this.loginState().isLoggedIn;
  }

  get userRole(): Role | undefined {
    return this.loginState().role;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      switchMap((response: any) => {
        const accessToken = response[TOKEN_KEY] as string;

        if (accessToken) {
          const tokenDecoded = this.decodeToken(accessToken);

          this.storageService.set(TOKEN_KEY, accessToken);
          this.loginState.set({
            isLoggedIn: true,
            role: tokenDecoded.role as Role,
            userId: tokenDecoded.sub as string
          });
        }

        return EMPTY;
      })
    );
  }

  private loadState(): AuthState {
    const accessToken = this.storageService.get(TOKEN_KEY) as string;

    if (accessToken) {
      const tokenDecoded = this.decodeToken(accessToken);

      this.storageService.set(TOKEN_KEY, accessToken);
      return {
        isLoggedIn: true,
        role: tokenDecoded.role as Role,
        userId: tokenDecoded.sub as string
      };
    }

    return {
      isLoggedIn: false,
      role: undefined,
      userId: undefined
    };
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      this.storageService.remove(TOKEN_KEY);
      this.loginState.set({
        isLoggedIn: false,
        role: undefined,
        userId: undefined
      });
    }
  }
}
