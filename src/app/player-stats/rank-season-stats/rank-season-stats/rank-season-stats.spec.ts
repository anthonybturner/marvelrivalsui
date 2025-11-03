import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankSeasonStats } from './rank-season-stats';

describe('RankSeasonStats', () => {
  let component: RankSeasonStats;
  let fixture: ComponentFixture<RankSeasonStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankSeasonStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankSeasonStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
