import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MSAL_INSTANCE,
} from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
} from '@azure/msal-browser';

export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'YOUR_CLIENT_ID',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: 'http://localhost:4200',
    }
  });
}

export function msalGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup,
  };
}

export function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['user.read']],
    ]),
  };
}

export const msalProviders = [
  {
    provide: MSAL_INSTANCE,
    useFactory: msalInstanceFactory,
  },
  {
    provide: MSAL_GUARD_CONFIG,
    useFactory: msalGuardConfigFactory,
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: msalInterceptorConfigFactory,
  }
];
