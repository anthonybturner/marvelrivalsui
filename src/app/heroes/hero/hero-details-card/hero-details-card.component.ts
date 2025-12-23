import { Component, computed, input, Input } from '@angular/core';
import { getImageUrl } from 'src/app/shared/utilities/image-utils';
import { handleImageError, getRoleImage } from 'src/app/shared/utilities';
import { IHero } from '../../hero/data/models/hero.model';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonModule } from '@angular/common';
import { HeroAbilitiesCardComponent } from './hero-abilities-card/hero-abilities-card.component';

@Component({
  selector: 'mr-hero-details-card',
  standalone: true,
  templateUrl: './hero-details-card.component.html',
  styleUrl: './hero-details-card.component.scss',
  imports: [MaterialModule, HeroAbilitiesCardComponent, CommonModule]
})
export class HeroDetailsCardComponent {

  hero = input<IHero | undefined>(undefined);

  getImageUrl = getImageUrl;
  handleImageError = handleImageError;
  getRoleImage = getRoleImage;

  heroRole = computed(() => this.hero()?.role);

  heroImage = computed(() => {
    const imagePath = this.hero()?.imageUrl;
    if (!imagePath) {
      return 'assets/images/logo.png';
    }
    const normalizedPath = imagePath.replace(/^\/+|\/+$/g, '');
    const basePaths = {
      hero: 'https://marvelrivalsapi.com/',
      image_path: 'https://marvelrivalsapi.com/rivals/',
      ability: 'https://marvelrivalsapi.com/rivals/'
    };
    try {
      return new URL(normalizedPath, basePaths['hero']).href;
    } catch {
      return 'assets/images/logo.png';
    }

  })

  heroRoleImage = computed(() => {
    const role = this.heroRole();
    switch (role?.toLowerCase()) {
      case 'vanguard': return 'assets/images/icons/vanguard.png';
      case 'duelist': return 'assets/images/icons/duelist.png';
      case 'strategist': return 'assets/images/icons/strategist.png';
      default: return '';
    }
  })

}
