import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallInfoStats } from './overall-info-stats';

describe('OverallInfoStats', () => {
  let component: OverallInfoStats;
  let fixture: ComponentFixture<OverallInfoStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverallInfoStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallInfoStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
