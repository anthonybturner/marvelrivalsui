import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  standalone: false,
  template: `
    <div class="callback-container">
      <div class="callback-content">
        <div class="spinner"></div>
        <h2>Completing your login...</h2>
        <p>You will be redirected shortly.</p>
      </div>
    </div>
  `,
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    // The OAuth service automatically processes the callback
    // We just wait for authentication to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (this.authService.isAuthenticated) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboards';
      this.router.navigate([returnUrl]);
    } else {
      this.router.navigate(['/auth/login'], { 
        queryParams: { error: 'authentication_failed' } 
      });
    }
  }
}