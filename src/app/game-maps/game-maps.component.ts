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
    const image = map.images.find((image: string) => image.includes('premium')) || '';
    return 'https://marvelrivalsapi.com' + image;
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