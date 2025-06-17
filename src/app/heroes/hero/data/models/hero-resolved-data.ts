
// src/app/heroes/data/models/hero-resolved-data.ts
export interface IHeroResolvedData {
  heroes?: IHero[];
}
export interface IHero {
  id: string;
  name: string;
  real_name: string;
  imageUrl: string;
  role: string;
  attack_type: string;
  team: string[];
  difficulty: string;
  bio: string;
  lore: string;
  transformations: Transformation[];
  costumes: Costume[];
  abilities: HeroAbility[];
}

interface Transformation {
  id: string;
  name: string;
  icon: string;
  health: string | null;
  movement_speed: string | null;
}

interface Costume {
  id: string;
  name: string;
  icon: string;
  quality: 'NO_QUALITY' | 'BLUE' | 'PURPLE' | 'ORANGE';
  description: string;
  appearance: string;
}

interface HeroAbility {
  id: number;
  icon: string;
  name: string;
  type: 'Ultimate' | 'Normal' | 'Weapon';
  isCollab: boolean;
  description: string;
  additional_fields: Record<string, any>;
  transformation_id: string;
}

export interface IHeroResponse {
  heros: IHero[];  // This is the key part, which holds the array of matches
}
