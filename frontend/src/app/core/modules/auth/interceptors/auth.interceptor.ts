import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../storage/services/storage.service';
import { TOKEN_KEY } from '../../storage/constants/constant';

export const SKIP_AUTH_INTERCEPTOR = new HttpContextToken(() => false);

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.context.get(SKIP_AUTH_INTERCEPTOR)) {
    return next(request);
  }

  const token = inject(StorageService).get(TOKEN_KEY) as string | null;
  const isAuthRequest = request.url.includes('/login');
  const isStaticAsset = request.url.includes('/assets/');
  const newHeaders: Record<string, string> = {};

  if (!isAuthRequest && !isStaticAsset && token) {
    newHeaders['Authorization'] = token;
  }

  if (!request.headers.has('Content-Type') && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    newHeaders['Content-Type'] = 'application/json';
  }

  const modifiedReq = request.clone({ setHeaders: newHeaders });
  return next(modifiedReq);
};
