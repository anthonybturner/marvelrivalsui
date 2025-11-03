import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If already authenticated, redirect to dashboard
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/dashboards']);
    }
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    this.authService.login();
  }

  loginWithGitHub(): void {
    // Placeholder for GitHub OAuth implementation
    console.log('GitHub login not implemented yet');
  }

  loginWithDiscord(): void {
    // Placeholder for Discord OAuth implementation
    console.log('Discord login not implemented yet');
  }
}