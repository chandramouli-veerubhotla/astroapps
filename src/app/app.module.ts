import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BhargavaSiddantamDayComponent } from './components/bhargava-siddantam-day/bhargava-siddantam-day.component';
import { HoraDetailsComponent } from './components/hora-details/hora-details.component';

import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditBasicComponent } from './components/edit-basic/edit-basic.component';
import { ReturnCalcComponent } from './components/return-calc/return-calc.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;


/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
 export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
  };
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BhargavaSiddantamDayComponent,
    HoraDetailsComponent,
    EditBasicComponent,
    ReturnCalcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    MsalModule.forRoot( new PublicClientApplication({ // MSAL Configuration
      auth: {
          clientId: environment.applicationId,
          authority: environment.authority,
          redirectUri: environment.redirectUri,
          postLogoutRedirectUri: environment.postLogoutRedirectUri
      },
      cache: {
          cacheLocation : BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: true, // set to true for IE 11
      },
      system: {
          loggerOptions: {
              loggerCallback: () => {},
              piiLoggingEnabled: false
          }
      }
  }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
  }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([])
  })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {provide: 'environment', useValue: environment}
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
