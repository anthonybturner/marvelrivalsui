import { Component, Input } from '@angular/core';
import { getImageUrl,handleImageError } from 'src/app/shared/utilities/image-utils';
import { IHeroAbility } from '../../../hero/data/models/hero.model';


@Component({
  selector: 'mr-hero-abilities-card',
  standalone: false,
  templateUrl: './hero-abilities-card.component.html',
  styleUrl: './hero-abilities-card.component.scss'
})
export class HeroAbilitiesCardComponent {

  @Input() abilities!: IHeroAbility[];
  getImageUrl = getImageUrl;
  handleImageError = handleImageError;

  getDescription(ability: any): string{
    return ability.description + "(" + (ability.additional_fields?.['Team-Up Bonus'] || 'NoBonus') + ")" ;
  }
}
