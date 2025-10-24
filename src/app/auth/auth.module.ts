import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { LoginComponent } from './login/login.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthService } from './auth.service';
import { AuthGuard, GuestGuard } from './auth.guard';

@NgModule({
  declarations: [
    LoginComponent,
    AuthCallbackComponent
  ],
  imports: [
    CommonModule,
    OAuthModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard],
        data: { pageTitle: 'Login' }
      },
      {
        path: 'callback',
        component: AuthCallbackComponent,
        data: { pageTitle: 'Authenticating...' }
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    GuestGuard
  ]
})
export class AuthModule { }