import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { msalProviders } from './msal.config';

import { MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { TokenInterceptor } from './core/auth/token.interceptor';
import { CustomErrorHandler } from './custom-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    // HttpClient with interceptors from DI
    provideHttpClient(withInterceptorsFromDi()),

    // Interceptors
    provideHttpClient(withInterceptorsFromDi()),
{
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
},

    // MSAL services & providers
    ...msalProviders,
    MsalService,
    MsalGuard,
    MsalBroadcastService,

    // Router
    provideRouter(routes),

    // Angular defaults
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    // Global error handler
    { 
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    },
  ]
};
