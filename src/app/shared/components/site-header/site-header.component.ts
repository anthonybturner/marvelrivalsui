import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerTitleService } from '../../services/player-title-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'mr-site-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './site-header.component.html',
    styleUrls: ['./site-header.component.scss'],
})
export class SiteHeaderComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Home';
    playerTitle: string = '';
    menuOpen = false;
    isAuthenticated = false;
    user: any;
    private destroy$ = new Subject<void>();

    constructor(
        private playerTitleService: PlayerTitleService
    ) {}

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    closeMenu(): void {
        this.menuOpen = false;
    }

    login(): void {
        this.closeMenu();
    }

    logout(): void {
        this.closeMenu();
    }
}
