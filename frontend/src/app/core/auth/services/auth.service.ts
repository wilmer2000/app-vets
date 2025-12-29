import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TOKEN_KEY } from '../../storage/constants/constant';
import { StorageService } from '../../storage/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/api/auth';
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);

  isLoggedIn = signal(false);

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: any) => {
        const accessToken = response[TOKEN_KEY] as string;

        if (accessToken) {
          this.storageService.set(TOKEN_KEY, accessToken);
          this.isLoggedIn.set(true);
        }

        return response;
      })
    );
  }
}
