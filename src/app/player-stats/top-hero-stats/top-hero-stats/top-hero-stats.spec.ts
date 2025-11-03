import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeroStats } from './top-hero-stats';

describe('TopHeroStats', () => {
  let component: TopHeroStats;
  let fixture: ComponentFixture<TopHeroStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopHeroStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopHeroStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
