import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { msalProviders } from './msal.config';

import { MsalService, MsalGuard, MsalBroadcastService, MsalInterceptor } from '@azure/msal-angular';
import { TokenInterceptor } from './core/auth/token.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomErrorHandler } from './custom-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),

    ...msalProviders,
    MsalService,
    MsalGuard,
    MsalBroadcastService,

    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    MatSnackBarModule,
    { 
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    },
  ]
};
