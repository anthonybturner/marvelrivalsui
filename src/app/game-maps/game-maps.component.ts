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
    this.activatedRoute.data.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe((response) => {
        this.gameMaps = response["resolvedData"].maps;
      })
  }
}