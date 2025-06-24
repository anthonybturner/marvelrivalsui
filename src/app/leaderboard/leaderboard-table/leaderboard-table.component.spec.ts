import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBoardTableComponent } from './leaderboard-table.component';

describe('LeaderBoardTableComponent', () => {
  let component: LeaderBoardTableComponent;
  let fixture: ComponentFixture<LeaderBoardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaderBoardTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderBoardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
