import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInfoStats } from './player-info-stats';

describe('PlayerInfoStats', () => {
  let component: PlayerInfoStats;
  let fixture: ComponentFixture<PlayerInfoStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerInfoStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerInfoStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
