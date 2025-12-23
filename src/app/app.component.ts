import { Component } from '@angular/core';
import { SiteHeaderComponent } from './shared/components/site-header/site-header.component';
import { SiteFooterComponent } from './shared/components/site-footer/site-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'mr-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [SiteHeaderComponent, SiteFooterComponent, RouterOutlet]
})
export class AppComponent {
  title = 'Marvel Rivals Stats';
}