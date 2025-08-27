export function getImageUrl(imagePath: string | undefined, type: 'hero' | 'ability' = 'hero'): string{
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
    return new URL(normalizedPath, basePaths[type]).href;
  } catch {
    return 'assets/images/logo.png';
  }
}

async function checkHeroImage(heroImageUrl: string) {
  return await imageExists(heroImageUrl);
}

export function getFallbackImageUrl(type: 'hero' | 'ability'): string {
  return 'assets/images/logo.png';
}

export async function imageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

export function handleImageError(event: Event, type: 'hero' | 'ability'): HTMLImageElement {
  const img = event.target as HTMLImageElement;
  img.src = type === 'hero'
    ? 'assets/images/default-hero.webp'
    : 'assets/images/default-ability.webp';
  return img;
}

export function getRoleImage(role: string | undefined): string{
  switch (role?.toLowerCase()) {
    case 'vanguard': return 'assets/images/icons/vanguard.png';
    case 'duelist': return 'assets/images/icons/duelist.png';
    case 'strategist': return 'assets/images/icons/strategist.png';
    default: return '';
  }
}

export function getPlayerImage(image: string | undefined): string{
  return `https://marvelrivalsapi.com/rivals/${image}`;
}

export function getRoleColor(role: string | undefined): string {
  switch (role?.toLowerCase()) {
    case 'vanguard': return 'primary';
    case 'assassin': return 'warn';
    default: return '';
  }
}