import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHero } from './data/models/hero.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mr-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  heroes: IHero[] = []
  ngUnsubscribe = new Subject();
  isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void{
    this.activatedRoute.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe((results) =>{
      this.heroes = results["resolvedData"];
    })
  }

  getRoleColor(role: string): string {
    switch(role.toLowerCase()) {
      case 'vanguard': return 'primary';
      case 'assassin': return 'warn';
      default: return '';
    }
  }

  getDescription(ability: any): string{
    return ability.description + "(" + (ability.additional_fields?.['Team-Up Bonus'] || 'NoBonus') + ")" ;
  }

  handleImageError(event: Event, type: 'hero' | 'ability') {
    const img = event.target as HTMLImageElement;
    img.src = type === 'hero' 
      ? 'assets/images/default-hero.webp' 
      : 'assets/images/default-ability.webp';
  }
  getImageUrl(imagePath: string | undefined, type: 'hero' | 'ability' = 'hero'): string {
    // Handle missing or invalid paths
    if (!imagePath) {
      return this.getFallbackImageUrl(type);
    }

    // Normalize path (remove leading/trailing slashes)
    const normalizedPath = imagePath.replace(/^\/+|\/+$/g, '');

    // Validate and construct URL
    try {
      const basePaths = {
        hero: 'https://marvelrivalsapi.com/',
        ability: 'https://marvelrivalsapi.com/rivals/'
      };
      return new URL(normalizedPath, basePaths[type]).href;
    } catch {
      return this.getFallbackImageUrl(type);
    }
  }

  private getFallbackImageUrl(type: 'hero' | 'ability'): string {
    return type === 'hero' 
      ? 'assets/images/logo.png'
      : 'assets/images/logo.png';
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
