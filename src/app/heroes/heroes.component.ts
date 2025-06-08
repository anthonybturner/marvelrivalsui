import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IHero, IHeroResolvedData } from './data/models/hero-resolved-data';  // Correct import path

@Component({
  selector: 'mr-heroes',
  standalone: false,
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  heroes: IHero[] = [];

  ngUnsubscribe = new Subject();  // Subject to manage unsubscription
isLoading: any;
  
  constructor(private activatedRoute: ActivatedRoute){}

   ngOnInit(): void {

    this.activatedRoute.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe( (results) =>{
      this.heroes = results["resolvedData"];

    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  // In component.ts
getHeroImageUrl(imagePath: string): string {
  return `https://marvelrivalsapi.com/rivals/${imagePath}`;
}

handleImageError(event: Event) {
  (event.target as HTMLImageElement).src = 'assets/images/default-hero.png';
}

}
