import { Component } from '@angular/core';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
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