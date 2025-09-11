import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { IGameMap } from './data/game-maps.model';

@Component({
  selector: 'mr-game-maps',
  standalone: false,
  templateUrl: './game-maps.component.html',
  styleUrl: './game-maps.component.scss'
})

export class GameMapsComponent implements OnInit, OnDestroy {

  
  ngUnsubscribe = new Subject();
  gameMaps: IGameMap[] = [];
  searchMapName: string = '';
  selectedGameMode: string = 'all';
  selectedMap: IGameMap | null = null;
  isLoading: boolean = false;
  showMapDetails: boolean = false;
  selectedMapForDetails: IGameMap | null = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  getMapImageUrl(map: IGameMap) {
    const priorities = ['premium', 'large'];
    const image = map.images.find((img => priorities.some(p => img.includes(p)))) || '';
    return 'https://marvelrivalsapi.com' + image;
  }

  getVideoUrl(url: string): string {
      // Only handle YouTube links
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
      return url;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.data.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe((response) => {
        this.gameMaps = response["resolvedData"].maps;
        this.isLoading = false;
      })
  }
  getUniqueGameModes(): string[] {
    const modes = new Set(this.gameMaps.map(map => map.game_mode).filter(Boolean));
    return Array.from(modes);
  }

  filterByGameMode(gameMode: string) {
    this.selectedGameMode = gameMode;
  }

  getFilteredMaps(): IGameMap[] {
    let filtered = this.gameMaps;

    // Filter by game mode
    if (this.selectedGameMode && this.selectedGameMode !== 'all') {
      filtered = filtered.filter(map => map.game_mode === this.selectedGameMode);
    }

    // Filter by search term
    if (this.searchMapName?.trim()) {
      const searchTerm = this.searchMapName.toLowerCase();
      filtered = filtered.filter(map =>
        map.name?.toLowerCase().includes(searchTerm) ||
        map.game_mode?.toLowerCase().includes(searchTerm) ||
        map.location?.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }

  selectMap(map: IGameMap) {
    this.selectedMap = map;
  }

  viewMapDetails(map: IGameMap) {
    this.selectedMapForDetails = map;
    this.showMapDetails = true;
  }

  closeMapDetails() {
    this.showMapDetails = false;
    this.selectedMapForDetails = null;
  }

  onSearchMap() {
    // Search is handled automatically through getFilteredMaps()
    console.log('Searching for:', this.searchMapName);
  }

  clearSearch() {
    this.searchMapName = '';
  }

  getGameModeClass(gameMode: string): string {
    return gameMode?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
  }

  onImageError(event: any) {
    event.target.src = 'assets/default-map-image.jpg';
  }

}