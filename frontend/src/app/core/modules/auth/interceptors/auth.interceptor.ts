import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../storage/services/storage.service';
import { TOKEN_KEY } from '../../storage/constants/constant';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const SKIP_AUTH_INTERCEPTOR = new HttpContextToken(() => false);

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.context.get(SKIP_AUTH_INTERCEPTOR)) {
    return next(request);
  }

  const newHeaders: Record<string, string> = {};
  const storage = inject(StorageService);
  const router = inject(Router);
  const token = storage.get(TOKEN_KEY) as string | null;
  const isAuthRequest = request.url.includes('/login');
  const isStaticAsset = request.url.includes('/assets/');

  if (!isAuthRequest && !token) {
    router.navigateByUrl('/login').then();
    return next(request).pipe(catchError((error) => throwError(() => error)));
  }

  if (!isAuthRequest && !isStaticAsset && token) {
    newHeaders['Authorization'] = `Bearer ${token}`;
  }

  if (!request.headers.has('Content-Type') && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    newHeaders['Content-Type'] = 'application/json';
  }

  const modifiedReq = request.clone({ setHeaders: newHeaders });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        storage.remove(TOKEN_KEY);

        inject(AuthService).logout();

        router.navigateByUrl('/login').then();

        return throwError(() => new Error('Session expired. Please log in again.'));
      }

      return throwError(() => new Error('Error authentication. Please try again later.'));
    })
  );
};
