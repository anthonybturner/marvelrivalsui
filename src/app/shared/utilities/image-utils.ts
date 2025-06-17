export function getImageUrl(imagePath: string | undefined, type: 'hero' | 'ability' = 'hero'): string {
  if (!imagePath) {
    return 'assets/images/logo.png';
  }
  const normalizedPath = imagePath.replace(/^\/+|\/+$/g, '');
  const basePaths = {
    hero: 'https://marvelrivalsapi.com/',
    ability: 'https://marvelrivalsapi.com/rivals/'
  };
  try {
    return new URL(normalizedPath, basePaths[type]).href;
  } catch {
    return 'assets/images/logo.png';
  }
}

export function getFallbackImageUrl(type: 'hero' | 'ability'): string {
  return 'assets/images/logo.png';
}


export function handleImageError(event: Event, type: 'hero' | 'ability'): HTMLImageElement {
  const img = event.target as HTMLImageElement;
  img.src = type === 'hero'
    ? 'assets/images/default-hero.webp'
    : 'assets/images/default-ability.webp';
  return img;
}


export function getRoleColor(role: string): string {
  switch (role.toLowerCase()) {
    case 'vanguard': return 'primary';
    case 'assassin': return 'warn';
    default: return '';
  }
}