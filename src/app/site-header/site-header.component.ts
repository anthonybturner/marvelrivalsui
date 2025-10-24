import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlayerTitleService } from '../shared/services/player-title-service';
import { AuthService, UserProfile } from '../auth/auth.service';

@Component({
    selector: 'mr-site-header',
    standalone: false,
    templateUrl: './site-header.component.html',
    styleUrls: ['./site-header.component.scss'],
})
export class SiteHeaderComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Home';
    playerTitle: string = '';
    menuOpen = false;
    user: UserProfile | null = null;
    isAuthenticated = false;
    private destroy$ = new Subject<void>();

    constructor(
        private router: Router, 
        private activatedRoute: ActivatedRoute, 
        private playerTitleService: PlayerTitleService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        // Subscribe to authentication state
        this.authService.user$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(user => {
            this.user = user;
            this.isAuthenticated = !!user;
        });

        // Subscribe to player title changes
        this.playerTitleService.playerName$.pipe(
            takeUntil(this.destroy$)
        ).subscribe((result: string) => {
            this.playerTitle = result;
        });
        
        // Subscribe to route changes for page title
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let route = this.activatedRoute;
                while (route?.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            mergeMap(route => route?.data ?? []),
            takeUntil(this.destroy$)
        ).subscribe((data: any) => {
            this.pageTitle = data['pageTitle'] || 'Home';
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    closeMenu(): void {
        this.menuOpen = false;
    }

    login(): void {
        this.authService.login();
        this.closeMenu();
    }

    logout(): void {
        this.authService.logout();
        this.closeMenu();
        this.router.navigate(['/auth/login']);
    }
}
