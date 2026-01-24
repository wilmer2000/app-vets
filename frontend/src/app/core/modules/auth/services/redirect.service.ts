import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, map, Observable } from 'rxjs';
import { TOKEN_KEY } from '../../storage/constants/constant';
import { StorageService } from '../../storage/services/storage.service';
import { AuthState } from '../interfaces/auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private readonly router = inject(Router);

  redirectTo(path: string): void {
    this.router.navigateByUrl(path).then();
  }
}
