import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../environments/environment";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  public user$ = this.userSubject.asObservable();

  private authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin + '/auth/callback',
    clientId: environment['googleClientId'],
    scope: 'openid profile email',
    responseType: 'code',
    // For development, we'll disable some strict checks
    requireHttps: !environment['devMode'],
    strictDiscoveryDocumentValidation: !environment['devMode'],
    useSilentRefresh: !environment['devMode'], // Disable for now during development
    showDebugInformation: environment['devMode'],
    oidc: true,
    silentRefreshRedirectUri: window.location.origin + '/auth/auth-callback',
    sessionChecksEnabled: false,
    clearHashAfterLogin: true
  };
  constructor(private oauthService: OAuthService) {
    // For development - you can bypass auth by setting this to true
    const bypassAuth = false; // Set to false when you want to use real OAuth

    if (bypassAuth) {
      // Create a mock user for development
      const mockUser: UserProfile = {
        id: 'dev-user-123',
        email: 'developer@marvelrivals.com',
        name: 'Developer User',
        picture: '/assets/images/default-avatar.svg'
      };
      this.userSubject.next(mockUser);
    } else {
      this.configureOAuth();
    }
  }

  private configureOAuth(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();

    // Set up to automatically process the callback URL
    this.oauthService.setupAutomaticSilentRefresh();

    // Load discovery and try login - this should process the callback
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.loadUserProfile();
      } else {
        this.checkUrlForOAuthParams();
      }
    }).catch(error => {
      console.error('❌ OAuth initialization failed:', error);
    });

    // Listen for OAuth events
    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        this.loadUserProfile();
      }
    });
  }


  // Add this method to manually check for OAuth parameters
  private checkUrlForOAuthParams(): void {
    const url = window.location.href;
    // Check for code parameter (Authorization Code flow)
    if (url.includes('code=')) {
      console.log('✅ Found authorization code in URL');
    }

    // Check for error parameter
    if (url.includes('error=')) {
      const errorMatch = url.match(/error=([^&]+)/);
      console.error('❌ OAuth error from Google:', errorMatch ? errorMatch[1] : 'unknown');
    }

    // Check for state parameter
    if (url.includes('state=')) {
      console.log('✅ Found state parameter in URL');
    }
  }

  public login(): void {
    this.oauthService.initCodeFlow();
  }

  public logout(): void {
    this.oauthService.logOut();
    this.userSubject.next(null);
  }

  public get isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  public get user(): UserProfile | null {
    return this.userSubject.value;
  }

  private loadUserProfile(): void {
    const claims = this.oauthService.getIdentityClaims();
    if (claims) {
      const user: UserProfile = {
        id: claims['sub'],
        email: claims['email'],
        name: claims['name'],
        picture: claims['picture']
      };
      this.userSubject.next(user);
    }
  }

  public refreshToken(): Promise<boolean> {
    return this.oauthService.refreshToken().then(() => true).catch(() => false);
  }
}

// Simple null validation handler for development
// In production, consider using JwksValidationHandler
class NullValidationHandler {
  validateSignature(): Promise<boolean> {
    return Promise.resolve(true);
  }

  validateAtHash(): Promise<boolean> {
    return Promise.resolve(true);
  }
}