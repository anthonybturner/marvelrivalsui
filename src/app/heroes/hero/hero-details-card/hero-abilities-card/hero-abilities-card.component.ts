import { Component, input, signal } from '@angular/core';
import { getImageUrl,handleImageError } from 'src/app/shared/utilities/image-utils';
import { IHeroAbility } from '../../../hero/data/models/hero.model';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport, ScrollingModule } from "@angular/cdk/scrolling";


@Component({
  selector: 'mr-hero-abilities-card',
  standalone: true,
  templateUrl: './hero-abilities-card.component.html',
  styleUrl: './hero-abilities-card.component.scss',
  imports: [MaterialModule, CdkVirtualScrollViewport, ScrollingModule]
})
export class HeroAbilitiesCardComponent {

  abilities = input<IHeroAbility[]>([]);
  getImageUrl = getImageUrl;
  handleImageError = handleImageError;

  getDescription(ability: any): string{
    return ability.description + "(" + (ability.additional_fields?.['Team-Up Bonus'] || 'NoBonus') + ")" ;
  }
}
