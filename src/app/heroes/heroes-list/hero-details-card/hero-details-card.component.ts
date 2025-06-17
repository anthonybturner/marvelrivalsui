import { Component, Input } from '@angular/core';
import { getImageUrl } from 'src/app/shared/utilities/image-utils';
import { handleImageError, getRoleColor } from 'src/app/shared/utilities';
import { IHero } from '../../hero/data/models/hero.model';

@Component({
  selector: 'mr-hero-details-card',
  standalone: false,
  templateUrl: './hero-details-card.component.html',
  styleUrl: './hero-details-card.component.scss'
})
export class HeroDetailsCardComponent {

  @Input() hero!: IHero;

  getImageUrl = getImageUrl;
  handleImageError = handleImageError;
  getRoleColor = getRoleColor;

}
