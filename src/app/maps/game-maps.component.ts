import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { IGameMap, IGameMapsResponse } from './data/game-maps.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameMapsService } from './services/game-maps.service';
import { CdkNoDataRow } from "@angular/cdk/table";

@Component({
  selector: 'mr-game-maps',
  standalone: true,
  templateUrl: './game-maps.component.html',
  styleUrl: './game-maps.component.scss',
  imports: [CommonModule, FormsModule]
})

export class GameMapsComponent implements OnInit, OnDestroy {

  ngUnsubscribe = new Subject();
  gameMaps = signal<IGameMap[]>([]);
  searchMapName: string = '';
  selectedGameMode = signal<string>('all');
  selectedMap = signal<IGameMap | undefined>(undefined);
  isLoading: boolean = false;

  constructor(private gameMapsSerivce: GameMapsService) { }

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
    this.gameMapsSerivce.getMaps().subscribe((response: IGameMapsResponse) => {
      this.gameMaps.set(response.maps || []);
      this.isLoading = false;
    })
  }
  getUniqueGameModes = computed(()=>{
    const gameMaps = this.gameMaps();
    if(!gameMaps) return [];
    const modes = new Set(gameMaps.map(map => map.game_mode).filter(Boolean));
    return Array.from(modes);
  });

  filterByGameMode(gameMode: string) {
    this.selectedGameMode.set(gameMode);
  }

  filteredMaps = computed(() => {
    let maps = this.gameMaps();
    let filteredMaps: IGameMap[] = []
    // Filter by game mode
    if (this.selectedGameMode() && this.selectedGameMode() !== 'all') {
      filteredMaps = maps?.filter(map => map.game_mode === this.selectedGameMode()) ?? [];
    }

    // Filter by search term
    if (this.searchMapName?.trim()) {
      const searchTerm = this.searchMapName.toLowerCase();
      filteredMaps = filteredMaps.filter(map =>
        map.name?.toLowerCase().includes(searchTerm) ||
        map.game_mode?.toLowerCase().includes(searchTerm) ||
        map.location?.toLowerCase().includes(searchTerm)
      );
    }

    return filteredMaps;
  })

  onSelectMap(map:IGameMap){
    this.selectedMap.set(map);
  }

  viewMapDetails(map: IGameMap) {
    this.selectedMap.set(map);
  }

  closeMapDetails() {
    this.selectedMap.set(undefined);
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