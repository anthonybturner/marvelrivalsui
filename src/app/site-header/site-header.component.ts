import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'mr-site-header',
    standalone: false,
    templateUrl: './site-header.component.html',
    styleUrls: ['./site-header.component.scss'],
})
export class SiteHeaderComponent {
    pageTitle: string = 'Home';

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let route = this.activatedRoute;
                while (route?.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            mergeMap(route => route?.data ?? [])
        ).subscribe(data => {
            this.pageTitle = data['pageTitle'] || 'Home';
        });
    }
}
